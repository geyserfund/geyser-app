// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

import "./TransferHelper.sol";

// @title Hash timelock contract for Ether
contract EtherSwap {
    // Constants

    /// @dev Version of the contract used for compatibility checks
    uint8 public constant version = 4;

    bytes32 public immutable DOMAIN_SEPARATOR;
    bytes32 public immutable TYPEHASH_REFUND;

    // State variables

    /// @dev Mapping between value hashes of swaps and whether they have Ether locked in the contract
    mapping(bytes32 => bool) public swaps;

    // Events

    event Lockup(
        bytes32 indexed preimageHash,
        uint256 amount,
        address claimAddress,
        address indexed refundAddress,
        uint256 timelock
    );

    event Claim(bytes32 indexed preimageHash, bytes32 preimage);
    event Refund(bytes32 indexed preimageHash);

    // Functions

    constructor() {
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256("EtherSwap"),
                keccak256("4"),
                block.chainid,
                address(this)
            )
        );
        TYPEHASH_REFUND = keccak256("Refund(bytes32 preimageHash,uint256 amount,address claimAddress,uint256 timeout)");
    }

    // External functions

    /// Locks Ether for a swap in the contract
    /// @notice The amount locked is the Ether sent in the transaction and the refund address is the sender of the transaction
    /// @param preimageHash Preimage hash of the swap
    /// @param claimAddress Address that can claim the locked Ether
    /// @param timelock Block height after which the locked Ether can be refunded
    function lock(bytes32 preimageHash, address claimAddress, uint256 timelock) external payable {
        lockEther(preimageHash, msg.value, claimAddress, timelock);
    }

    /// Locks Ether for a swap in the contract and forwards a specified amount of Ether to the claim address
    /// @notice The amount locked is the Ether sent in the transaction minus the prepay amount and the refund address is the sender of the transaction
    /// @dev Make sure to set a reasonable gas limit for calling this function, else a malicious contract at the claim address could drain your Ether
    /// @param preimageHash Preimage hash of the swap
    /// @param claimAddress Address that can claim the locked Ether
    /// @param timelock Block height after which the locked Ether can be refunded
    /// @param prepayAmount Amount that should be forwarded to the claim address
    function lockPrepayMinerfee(
        bytes32 preimageHash,
        address payable claimAddress,
        uint256 timelock,
        uint256 prepayAmount
    ) external payable {
        // Revert on underflow in next statement
        require(msg.value > prepayAmount, "EtherSwap: sent amount must be greater than the prepay amount");

        // Lock the amount of Ether sent minus the prepay amount in the contract
        lockEther(preimageHash, msg.value - prepayAmount, claimAddress, timelock);

        // Forward the prepay amount to the claim address
        TransferHelper.transferEther(claimAddress, prepayAmount);
    }

    /// Claims Ether locked in the contract
    /// @dev To query the arguments of this function, get the "Lockup" event logs for the SHA256 hash of the preimage
    /// @param preimage Preimage of the swap
    /// @param amount Amount locked in the contract for the swap in WEI
    /// @param refundAddress Address that locked the Ether in the contract
    /// @param timelock Block height after which the locked Ether can be refunded
    function claim(bytes32 preimage, uint256 amount, address refundAddress, uint256 timelock) external {
        // Passing "msg.sender" as "claimAddress" to "hashValues" ensures that only the destined address can claim
        // All other addresses would produce a different hash for which no swap can be found in the "swaps" mapping
        claim(preimage, amount, msg.sender, refundAddress, timelock);
    }

    /// Claims multiple swaps
    /// @dev All swaps that are claimed have to have "msg.sender" as "claimAddress"
    /// @param preimages Preimages of the swaps
    /// @param amounts Amounts that are locked in the contract for the swap in WEI
    /// @param refundAddresses Addresses that locked the Ether in the contract
    /// @param timelocks Block heights after which the locked Ether can be refunded
    function claimBatch(
        bytes32[] calldata preimages,
        uint256[] calldata amounts,
        address[] calldata refundAddresses,
        uint256[] calldata timelocks
    ) external {
        uint256 toSend = 0;
        uint256 swapAmount = 0;

        unchecked {
            for (uint256 i = 0; i < preimages.length; i++) {
                swapAmount = amounts[i];
                prepareClaim(preimages[i], swapAmount, msg.sender, refundAddresses[i], timelocks[i]);

                // For the "prepareClaim" function to not revert, the amount has to have been locked
                // in the contract which means this addition cannot overflow in realistic scenarios
                toSend += swapAmount;
            }
        }

        TransferHelper.transferEther(payable(msg.sender), toSend);
    }

    /// Refunds Ether locked in the contract after the timeout
    /// @dev To query the arguments of this function, get the "Lockup" event logs for your refund address and the preimage hash if you have it
    /// @dev For further explanations and reasoning behind the statements in this function, check the "claim" function
    /// @param preimageHash Preimage hash of the swap
    /// @param amount Amount locked in the contract for the swap in WEI
    /// @param claimAddress Address that that was destined to claim the funds
    /// @param timelock Block height after which the locked Ether can be refunded
    function refund(bytes32 preimageHash, uint256 amount, address claimAddress, uint256 timelock) external {
        refund(preimageHash, amount, claimAddress, msg.sender, timelock);
    }

    /// Refunds Ether locked in the contract with an EIP-712 signature of the claimAddress
    /// @dev To query the arguments of this function, get the "Lockup" event logs for your refund address and the preimage hash if you have it
    /// @dev For further explanations and reasoning behind the statements in this function, check the "claim" function
    /// @param preimageHash Preimage hash of the swap
    /// @param amount Amount locked in the contract for the swap in WEI
    /// @param claimAddress Address that that was destined to claim the funds
    /// @param timelock Block height after which the locked Ether can be refunded
    /// @param v final byte of the signature
    /// @param r second 32 bytes of the signature
    /// @param s first 32 bytes of the signature
    function refundCooperative(
        bytes32 preimageHash,
        uint256 amount,
        address claimAddress,
        uint256 timelock,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        address recoveredAddress = ecrecover(
            keccak256(
                abi.encodePacked(
                    "\x19\x01",
                    DOMAIN_SEPARATOR,
                    keccak256(abi.encode(TYPEHASH_REFUND, preimageHash, amount, claimAddress, timelock))
                )
            ),
            v,
            r,
            s
        );
        require(recoveredAddress != address(0) && recoveredAddress == claimAddress, "EtherSwap: invalid signature");

        refundInternal(preimageHash, amount, claimAddress, msg.sender, timelock);
    }

    // Public functions

    /// Claims Ether locked in the contract for a specified claim address
    /// @dev To query the arguments of this function, get the "Lockup" event logs for the SHA256 hash of the preimage
    /// @param preimage Preimage of the swap
    /// @param amount Amount locked in the contract for the swap in WEI
    /// @param claimAddress Address to which the claimed funds will be sent
    /// @param refundAddress Address that locked the Ether in the contract
    /// @param timelock Block height after which the locked Ether can be refunded
    function claim(bytes32 preimage, uint256 amount, address claimAddress, address refundAddress, uint256 timelock)
        public
    {
        prepareClaim(preimage, amount, claimAddress, refundAddress, timelock);

        // Transfer the Ether to the claim address
        TransferHelper.transferEther(payable(claimAddress), amount);
    }

    /// Refunds Ether locked in the contract after the timeout for a specified refund address address
    /// @dev To query the arguments of this function, get the "Lockup" event logs for your refund address and the preimage hash if you have it
    /// @dev For further explanations and reasoning behind the statements in this function, check the "claim" function
    /// @param preimageHash Preimage hash of the swap
    /// @param amount Amount locked in the contract for the swap in WEI
    /// @param claimAddress Address that that was destined to claim the funds
    /// @param refundAddress Address that locked the Ether in the contract
    /// @param timelock Block height after which the locked Ether can be refunded
    function refund(bytes32 preimageHash, uint256 amount, address claimAddress, address refundAddress, uint256 timelock)
        public
    {
        // Make sure the timelock has expired already
        // If the timelock is wrong, so will be the value hash of the swap which results in no swap being found
        require(timelock <= block.number, "EtherSwap: swap has not timed out yet");
        refundInternal(preimageHash, amount, claimAddress, refundAddress, timelock);
    }

    /// Hashes all the values of a swap with Keccak256
    /// @param preimageHash Preimage hash of the swap
    /// @param amount Amount the swap has locked in WEI
    /// @param claimAddress Address that can claim the locked Ether
    /// @param refundAddress Address that locked the Ether and can refund them
    /// @param timelock Block height after which the locked Ether can be refunded
    /// @return Value hash of the swap
    function hashValues(
        bytes32 preimageHash,
        uint256 amount,
        address claimAddress,
        address refundAddress,
        uint256 timelock
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(preimageHash, amount, claimAddress, refundAddress, timelock));
    }

    // Private functions

    /// Prepares a claim by checking if funds were locked, deleting the swap from storage
    /// and emitting an event but ***does not*** transfer
    /// @param preimage Preimage of the swap
    /// @param amount Amount locked in the contract for the swap in WEI
    /// @param claimAddress Address that that was destined to claim the funds
    /// @param refundAddress Address that locked the Ether and can refund them
    /// @param timelock Block height after which the locked Ether can be refunded
    function prepareClaim(
        bytes32 preimage,
        uint256 amount,
        address claimAddress,
        address refundAddress,
        uint256 timelock
    ) private {
        // If the preimage is wrong, so will be its hash which will result in a wrong value hash and no swap being found
        bytes32 preimageHash = sha256(abi.encodePacked(preimage));
        bytes32 hash = hashValues(preimageHash, amount, claimAddress, refundAddress, timelock);

        // Make sure that the swap to be claimed has Ether locked
        checkSwapIsLocked(hash);

        // Delete the swap from the mapping to ensure that it cannot be claimed or refunded anymore
        // This *HAS* to be done before actually sending the Ether to avoid reentrancy
        delete swaps[hash];

        // Emit the claim event
        emit Claim(preimageHash, preimage);
    }

    /// Locks Ether in the contract
    /// @notice The refund address is the sender of the transaction
    /// @param preimageHash Preimage hash of the swap
    /// @param amount Amount to be locked in the contract
    /// @param claimAddress Address that can claim the locked Ether
    /// @param timelock Block height after which the locked Ether can be refunded
    function lockEther(bytes32 preimageHash, uint256 amount, address claimAddress, uint256 timelock) private {
        // Locking zero WEI in the contract is pointless
        require(amount > 0, "EtherSwap: locked amount must not be zero");

        // Hash the values of the swap
        bytes32 hash = hashValues(preimageHash, amount, claimAddress, msg.sender, timelock);

        // Make sure no swap with this value hash exists yet
        require(!swaps[hash], "EtherSwap: swap exists already");

        // Save to the state that funds were locked for this swap
        swaps[hash] = true;

        // Emit the "Lockup" event
        emit Lockup(preimageHash, amount, claimAddress, msg.sender, timelock);
    }

    function refundInternal(
        bytes32 preimageHash,
        uint256 amount,
        address claimAddress,
        address refundAddress,
        uint256 timelock
    ) private {
        bytes32 hash = hashValues(preimageHash, amount, claimAddress, refundAddress, timelock);

        checkSwapIsLocked(hash);
        delete swaps[hash];

        emit Refund(preimageHash);

        TransferHelper.transferEther(payable(refundAddress), amount);
    }

    /// Checks whether a swap has Ether locked in the contract
    /// @dev This function reverts if the swap has no Ether locked in the contract
    /// @param hash Value hash of the swap
    function checkSwapIsLocked(bytes32 hash) private view {
        require(swaps[hash], "EtherSwap: swap has no Ether locked in the contract");
    }
}

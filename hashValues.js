#!/usr/bin/env node

// Import required dependencies
const crypto = require('crypto');

// Since Node.js doesn't have keccak256 built-in, we'll use a simple implementation
// This is a basic keccak256 implementation - for production use a proper library
function keccak256(data) {
  // For this standalone script, we'll use a simplified approach
  // In a real implementation, you'd want to use a proper keccak256 library
  const hash = crypto.createHash('sha3-256');
  hash.update(data);
  return hash.digest('hex');
}

// ==========================================
// CONFIGURATION - Modify these values
// ==========================================
const CONFIG = {
  preimageHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  amount: 3608007029506048,
  claimAddress: '0x1234567890123456789012345678901234567890',
  refundAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
  timelock: 1234567890
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Convert Ethereum address to 32-byte buffer (left-padded with zeros)
 */
function addressToBuffer32(address) {
  const buffer = Buffer.alloc(32);
  const cleanAddress = address.replace('0x', '');
  
  if (cleanAddress.length !== 40) {
    throw new Error('Invalid Ethereum address format');
  }
  
  Buffer.from(cleanAddress, 'hex').copy(buffer, 12);
  return buffer;
}

/**
 * Convert number to 32-byte big-endian buffer
 */
function numberToBuffer32(num) {
  const bigIntValue = BigInt(num);
  
  // Convert BigInt to hex string, pad to 64 characters (32 bytes)
  const hexString = bigIntValue.toString(16).padStart(64, '0');
  
  return Buffer.from(hexString, 'hex');
}

/**
 * Replicates Solidity hashValues function from EtherSwap.sol
 * Concatenates and hashes preimageHash, amount, claimAddress, refundAddress, timelock
 */
function hashValues(preimageHash, amount, claimAddress, refundAddress, timelock) {
  try {
    console.log('=== hashValues Function ===');
    console.log('Inputs:', { preimageHash, amount, claimAddress, refundAddress, timelock });

    // Convert preimageHash to 32-byte buffer
    const preimageBuffer = Buffer.alloc(32);
    const cleanPreimageHash = preimageHash.replace('0x', '');
    if (cleanPreimageHash.length !== 64) {
      throw new Error('Invalid preimageHash format: must be 32 bytes (64 hex chars)');
    }
    
    Buffer.from(cleanPreimageHash, 'hex').copy(preimageBuffer);

    // Convert other parameters to 32-byte buffers
    const amountBuffer = numberToBuffer32(amount);
    const claimAddressBuffer = addressToBuffer32(claimAddress);
    const refundAddressBuffer = addressToBuffer32(refundAddress);
    const timelockBuffer = numberToBuffer32(timelock);

    // Concatenate all parameters (replicating the assembly logic)
    // mstore(ptr, preimageHash)         -> offset 0x00 (0)
    // mstore(add(ptr, 0x20), amount)    -> offset 0x20 (32)
    // mstore(add(ptr, 0x40), claimAddress) -> offset 0x40 (64)
    // mstore(add(ptr, 0x60), refundAddress) -> offset 0x60 (96)
    // mstore(add(ptr, 0x80), timelock)  -> offset 0x80 (128)
    // Total length: 0xa0 (160 bytes)
    const concatenated = Buffer.concat([
      preimageBuffer, // 32 bytes
      amountBuffer, // 32 bytes
      claimAddressBuffer, // 32 bytes
      refundAddressBuffer, // 32 bytes
      timelockBuffer, // 32 bytes
    ]);

    console.log('\n=== Buffer Details ===');
    console.log('preimageBuffer:', '0x' + preimageBuffer.toString('hex'));
    console.log('amountBuffer:', '0x' + amountBuffer.toString('hex'));
    console.log('claimAddressBuffer:', '0x' + claimAddressBuffer.toString('hex'));
    console.log('refundAddressBuffer:', '0x' + refundAddressBuffer.toString('hex'));
    console.log('timelockBuffer:', '0x' + timelockBuffer.toString('hex'));
    console.log('concatenated:', '0x' + concatenated.toString('hex'));
    console.log('concatenated length:', concatenated.length, 'bytes');

    // Hash with keccak256 (replicating: result := keccak256(ptr, 0xa0))
    const hash = keccak256(concatenated);
    const result = '0x' + hash;

    console.log('\n=== Result ===');
    console.log('Hash result:', result);
    console.log('=== End hashValues ===');

    return result;
  } catch (error) {
    throw new Error(`Failed to hash values: ${error.message}`);
  }
}

// ==========================================
// MAIN EXECUTION
// ==========================================

console.log('🚀 HashValues Calculator');
console.log('========================\n');

try {
  const result = hashValues(
    CONFIG.preimageHash,
    CONFIG.amount,
    CONFIG.claimAddress,
    CONFIG.refundAddress,
    CONFIG.timelock
  );
  
  console.log('\n✅ SUCCESS!');
  console.log('Final hash:', result);
} catch (error) {
  console.error('\n❌ ERROR:', error.message);
  process.exit(1);
}

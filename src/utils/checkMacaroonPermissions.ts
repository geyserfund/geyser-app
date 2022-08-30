export const checkMacaroonPermissions = (macaroon: string) => {
	// Buffer can be used server-side and atob client side
	// const utf8Encoded = Buffer.from(macaroon, 'base64').toString('utf8');
	const utf8Encoded = atob(macaroon);

	const chunks = utf8Encoded.split('\n').map(a => a.split('\t')).flat();

	// Remove ASCII control characters and non-alphabetical characters
	const cleanedChunks = chunks.map(chunk => chunk.replace(/[^\x0-\x7F]/g, '').replace(/[^a-z]/gi, ''));

	const permissions = cleanedChunks.filter(chunk => chunk.includes('read') || chunk.includes('write'));

	const requiredPermissions = ['addressreadwrite', 'invoicesreadwrite', 'onchainread'];

	// 1. check that permissions contains all required permissions
	const missingPermissions = requiredPermissions.filter(permission => !permissions.includes(permission)); // permissions.pop() });
	if (missingPermissions.length > 0) {
		throw new Error(`macaroon is missing the following permissions: ${JSON.stringify(Array.from(missingPermissions))}`);
	}

	// 2. check that macaroon does not contains additional permissions
	const extraPermissions = permissions.filter(permission => !requiredPermissions.includes(permission));
	if (extraPermissions.length > 0) {
		throw new Error(
			`macaroon has the following unnecessary permissions: ${JSON.stringify(Array.from(extraPermissions))}. Make sure you did not paste an admin macaroon`,
		);
	}
};

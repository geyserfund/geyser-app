import { bech32 } from 'bech32';

const rules = {
	prefix: 'lnurl',
	limit: 1023,
};

export const encode = (unencoded: string) => {
	if (typeof unencoded !== 'string') {
		throw new Error('Invalid argument ("unencoded"): String expected');
	}

	const words = bech32.toWords(Buffer.from(unencoded, 'utf8'));
	return bech32.encode(rules.prefix, words, rules.limit);
};

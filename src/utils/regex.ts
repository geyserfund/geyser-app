export const validEmail = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const validLightningAddress = new RegExp(/[^a-z0-9-_]+/g);

export const isValidLightningAddress = (address: string) => {
  const match = validLightningAddress.test(address);

  return match;
};

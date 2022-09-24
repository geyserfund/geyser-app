export const validEmail = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const validLighteningAddress = new RegExp(/[^a-z0-9-_]+/g);

export const isValidLighteningAddress = (address: string) => {
  const match = validLighteningAddress.test(address);

  return match;
};

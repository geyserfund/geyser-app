/* eslint-disable no-useless-escape */
export const validEmail = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const validLightningAddress = new RegExp(/[^a-z0-9-_]+/g);

export const validUrl = new RegExp(
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
);

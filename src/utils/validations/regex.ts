/* eslint-disable no-useless-escape */
export const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const validLightningAddress = /[^a-z0-9-_]+/g

export const validUrl =
  /(^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$)|(^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$)/

export const matchMarkDownSpecialKeysAtLineEnd =
  /\n(?!.*(\*|_|#|-|\`|[0-9]+(\.|\))))/g

/* eslint-disable no-useless-escape */
export const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,10}$/

export const validLightningAddress = /[^a-z0-9-_]+/g

export const validUrl =
  /(^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,9}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$)|(^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,9}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$)/

export const validNumber = /^[0-9]*$/

export const imageUrlRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg)$/i
export const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i
export const vimeoUrlRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/i

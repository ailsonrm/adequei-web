export const phoneDDDMask = value => {
  return value
    .replace(/\D/g, '')
}

export const phoneNumberMask = value => {
  return value
    .replace(/\D/g, '')
}

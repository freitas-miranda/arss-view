// https://stackoverflow.com/questions/39373047/include-global-functions-in-vue-js

const strip = function (number, strict) {
  const STRICT_STRIP_REGEX = /[.-]/g
  const LOOSE_STRIP_REGEX = /[^\d]/g

  const regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX
  return (number || '').toString().replace(regex, '')
}

export const cpf = {
  strip: (number) => {
    return number ? strip(number) : number
  },
  format: (number) => {
    return strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
  }
}

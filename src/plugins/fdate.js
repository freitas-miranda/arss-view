import dayjs from '@/plugins/dayjs'

export const fdate = {
  toSql: (date) => {
    return date ? dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
  },
  toView: (date) => {
    return date ? dayjs(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : date
  },
  fone: (numero) => {
    if (!numero) return null
    let striped = numero.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')

    if (striped) {
      if (striped.length >= 10 && striped.length <= 12) {
        return striped.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')
      } else {
        return striped
      }
    } else { return striped }
  }
}

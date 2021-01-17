import dayjs from '@/plugins/dayjs'

export const fdate = {
  toSql: (date) => {
    return date ? dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
  }
}

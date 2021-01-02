import axios from '@/plugins/axios'
import axiosMD045 from '@/plugins/axios_md045'
import dayjs from '@/plugins/dayjs'

const formatarData = (data, defaultData = 'YYYY-MM-DD HH:mm:ss', formatoData = 'DD/MM/YY HH:mm:ss') => {
  const dataFormatada = dayjs(data, defaultData).format(formatoData)
  return dataFormatada
}
const addDateInArrayObject = (arrayObject) => {
  const arrayIsNotEmpty = Array.isArray(arrayObject) && arrayObject.length > 0
  if (arrayIsNotEmpty) {
    for (const object of arrayObject) {
      object.dataExecucao = formatarData(dayjs().format())
    }
  }
  return arrayObject
}

const progressPromiseAllSettled = (promises, progresso) => {
  let count = 0
  progresso(0)

  for (const promise of promises) {
    promise.then((el) => {
      count++
      progresso(count)
      addDateInArrayObject(el.data)
    }, (err) => {
      err.dataExecucao = formatarData(dayjs().format())
    })
  }

  return Promise.allSettled(promises)
}

const findEmpresaInString = (arrayEmpresa = [], stringBase = '') => {
  const isArrayEmpresa = Array.isArray(arrayEmpresa) && arrayEmpresa.length > 0
  if (isArrayEmpresa) {
    for (const empresa of arrayEmpresa) {
      if (stringBase.toUpperCase().includes(empresa.codigo.toUpperCase())) {
        return empresa.codigo
      }
    }
  }
  return ''
}

export const obterFluxos = async ({ commit }) => {
  /* Loading vai parar, somente quando a auditoria
    de todas as lojas forem processadas
  */
  commit('setLoading', true)

  const res = await axios.get('dashboard/fluxos')

  if (res.data) {
    commit('setFluxos', res.data)
  }

  return res.data
}

export const obterAuditorias = async ({ commit }) => {
  try {
    commit('setLoading', true)

    const empresas = await axios.get('dashboard/empresas')
    commit('setTotalLojas', empresas.data.length)

    const fluxoPromise = []
    for (const empresa of empresas.data) {
      axiosMD045.defaults.baseURL = `http://estapi-${empresa.codigo}:8045/api`

      fluxoPromise.push(Promise.resolve(axiosMD045.get('auditoria/dashboard')))
    }

    const fluxoPromiseAllSettled = await progressPromiseAllSettled(fluxoPromise, (progress) => {
      commit('setLoadingCountLojas', progress)
    })

    const allFluxos = []
    for (const promise of fluxoPromiseAllSettled) {
      if (promise.status === 'fulfilled') {
        allFluxos.push(promise.value.data)
      } else if (promise.status === 'rejected') {
        const errorRequest = {
          empresa: findEmpresaInString(empresas.data, promise.reason.config.baseURL),
          erro: promise.reason.message,
          dataExecucao: promise.reason.dataExecucao
        }
        allFluxos.push([errorRequest])
      }
    }

    const res = allFluxos.flat()

    if (allFluxos) {
      commit('setAuditorias', res)
    }

    return res
  } finally {
    commit('setLoading', false)
  }
}

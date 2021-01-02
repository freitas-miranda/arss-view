import Vue from 'vue'
import XLSX from 'xlsx'

const objIsEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const renomearTituloColunas = (oldTituloColunas, newTituloColunas) => {
  if (objIsEmpty(newTituloColunas)) {
    return oldTituloColunas
  }

  const arrayComTituloRenomeado = []
  for (const obj of oldTituloColunas) {
    const recebeNovoTitulo = Object.keys(newTituloColunas).map(key => {
      const titulo = newTituloColunas[key]
      if (obj[key]) {
        return { [titulo]: obj[key] }
      }
    })

    arrayComTituloRenomeado.push(Object.assign({}, ...recebeNovoTitulo))
  }

  return arrayComTituloRenomeado
}

const exportarExcel = (registros, colunas = []) => {
  const tituloColunas = {}

  for (const coluna of colunas) {
    if (coluna.value !== 'acao') {
      tituloColunas[coluna.value] = coluna.text
    }
  }

  const newArrayColunas = renomearTituloColunas(Object.values(registros), tituloColunas)

  var excelPagina = XLSX.utils.json_to_sheet(newArrayColunas)

  var workBook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workBook, excelPagina, 'Implementação de Estoque')

  XLSX.writeFile(workBook, 'TabelaExcel.xlsx')
}

Vue.prototype.$exportarExcel = exportarExcel

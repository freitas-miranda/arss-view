const dotenv = require('dotenv')
const express = require('express')
const app = express()
const path = require('path')

dotenv.config({ path: '.env' })

app.listen(process.env.APP_PORT, function () {
  console.log(`O Servidor esta executando na porta ${process.env.APP_PORT}!`)
})

const publicPath = path.join(__dirname, '../../dist/')

app.use(express.static(publicPath))

app.get('*', (_req, res) => res.sendFile(path.join(publicPath, 'index.html')))

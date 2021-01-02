# md058-view
> Modelo de aplicação SPA utilizando Vue.js e Vuetify.

## Ambiente
 - Node.js
 - Yarn

## Visual Studio Code
  - Plugins
    - DotENV
    - ESLint
    - Vetur

  - Configuração workspace
    ``` js
    {
        // settings.json
      "files.trimTrailingWhitespace": true,
      "files.insertFinalNewline": true,
      "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
      "editor.tabSize": 2,
      "editor.renderWhitespace": "boundary"
    }
    ```

#### Entre no diretório raiz
```bash
$ cd md058-view
```
#### Copie as variáveis de ambiente e configure
```bash
$ cp .env.example .env
```
#### Instale as dependências
```bash
$ yarn
```
#### Efetue o build da aplicação
```bash
$ yarn build
```
#### Subir o servidor
```bash
$ yarn start
```
ou
```bash
$ yarn start-pm2
$ pm2 save
```

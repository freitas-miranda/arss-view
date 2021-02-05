# ARSS - View
> Frontend do sistema ARSS

## Ambiente
 - Node.js 12.x
 - Yarn
 - PM2
 - Nginx

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
      "files.insertFinalNewline": true
    }
    ```

## Desenvolvimento
```bash
# Usar Git Bash
# Clonar o ou fazer o download do repositório
git clone -b develop git@github.com:freitas-miranda/arss-view.git

# Entre no diretório raiz
cd arss-view

# Configure o ambiente
notepad .env

# Instale as dependências
yarn

# Subir o cliente
yarn serve
```

## Produção
```bash
# Usar Git Bash
# Posicionar na pasta do projeto
cd c:/git/arss-view/

# Configure o ambiente de produção
notepad .env

# Buildar o cliente
yarn && yarn lint && yarn build

# Posicionar na pasta para versionamento
# Necessário ter acesso ao repositório de deploy:
# git clone git@github.com:freitas-miranda/deploy.git c:/git/deploy/
cd c:/git/deploy/ && git checkout arss-view && git pull

# Limpar dados antigos e copiar os dados da nova versão
rm -rf ./dist/ && cp -r c:/git/arss-view/dist/ ./dist/

# Enviar par o servidor
git add -A && git commit -m "v0.0.9" && git push

# Voltar para pasta do projeto
cd c:/git/arss-view/

# Acessar a vm de produção
ssh root@arss.link

# Atualizar os arquivos do cliente
cd /servidores/deploy && git pull

# Limpar dados antigos e copiar os dados da nova versão
rm -rf /usr/share/nginx/html && cp -r ./dist/ /usr/share/nginx/html

# Verificar versão
http://arss.link/perfil
```


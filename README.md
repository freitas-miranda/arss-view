# ARSS - View
> Frontend do sistema ARSS

## Ambiente
 - Node.js 12.x
 - Yarn
 - PM2

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
# Clonar o repositório
git clone -b develop git@github.com:freitas-miranda/arss-view.git

# Entre no diretório raiz
cd arss-view

# Configure o ambiente
cp .env.example .env

# Instale as dependências
yarn

# Subir o cliente
yarn serve
```

## Gerar a Imagem Docker
```bash
# Subir o serviço do docker na máquina de desenvolvimento

# Buildar o projeto
yarn && yarn lint && yarn build

# Remover a imagem antiga
docker images
docker image rm freitasmiranda/arss-view

# Gerar a imagem docker (Deve ser o .env de produção)
docker build -t freitasmiranda/arss-view .

# Fazer login docker
docker login || docker logout

# Enviar a imagem para DockerHub
docker push freitasmiranda/arss-view

```

## Subir a Imagem Docker
```bash
# Acessar a VM de produção
ssh root@www.arss.link

# Fazer login docker
docker login

# Baixar imagem
docker pull freitasmiranda/arss-view

# Subir container
docker run --name ARSS_VIEW_C1 --restart always -p 8080:80 -e TZ=America/Porto_Velho -d freitasmiranda/arss-view

# Lista de containers
docker container ls -a

# Parar o container
docker container stop ARSS_VIEW_C1

# Excluír todos containers parados
docker container prune

# Lista das imagens
docker images

# Excluír imagens
docker image rm freitasmiranda/arss-view

```

# Store Manager Project

Aplicação realizada enquanto aluno da [Trybe](https://www.betrybe.com/) para reforçar os conhecimentos sobre [Node.js](https://nodejs.org/en/)
conectado à um banco de dados [MySQL](https://www.mysql.com/) através de uma [API RESTful](https://blog.betrybe.com/desenvolvimento-web/api-rest-tudo-sobre/).
O trabalho consiste em desenvolver uma API com arquitetura MSC (Model-Service-Controller), que é um modelo de arquitetura de software baseado em camadas:

- `Model`: Esta camada é responsável por abrigar todo o código que pode acessar os dados no banco de dados ou no sistema de arquivos.
- `Service`: Esta camada é responsável por validar as regras de negócio da aplicação.
- `Controller`: Essa camada é responsável por validar os valores recebidos de uma aplicação cliente.

Além disso, foi utilizado tecnologias como [mocha](https://mochajs.org/), [chai](https://www.chaijs.com/) e [sinon](https://sinonjs.org/) para testar e validar a aplicação.

<br>

Descrição do Projeto:

> A API a ser construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível  procurar, criar, visualizar e 
deletar produtos e vendas. Você deverá utilizar o banco de dados MySQL para a gestão de dados. Além disso, a API deve ser RESTful.

<br>

<details>
  <summary><strong>Como instalar o Projeto Store Manager</strong></summary><br />

## Instalação
 
<hr>
 
### Rodando a aplicação via [Docker](https://www.docker.com/)

> - :warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.

> - :warning: Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run debug, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima

> - :warning: O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

> - :warning: Se você se deparar com o erro abaixo, quer dizer que sua aplicação já esta utilizando a `porta 3000`, seja com outro processo do Node.js (que você pode parar com o comando `killall node`) ou algum container! Neste caso você pode parar o container com o comando `docker stop <nome-do-container>`

<br>

- Clone o repositório `git@github.com:Rafael-Souza-97/store-manager.git`:

```bash
git clone git@github.com:Rafael-Souza-97/store-manager.git
```

<br>

- Entre na pasta do repositório que você acabou de clonar:

```bash
cd store-manager
```

<br>

- Rode o serviço `node` com o comando `docker-compose up -d`:

 > - Esse serviço irá inicializar um container chamado `store_manager`.
 > - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
 
```bash
docker-compose up -d
```

<br>

- Use o comando `docker exec -it store_manager bash`:

 > - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
 > - As credencias de acesso ao banco de dados estão definidas no arquivo `docker-compose.yml`, e são acessíveis no container através das variáveis de ambiente `MYSQL_USER` e `MYSQL_PASSWORD`.

```bash
docker exec -it store_manager bash
```

<br>

- Instale as depëndencias, caso necessário, com `npm install` (dentro do bash do container):

```bash
npm install
```

 > Execute a aplicação com `npm start` ou `npm run debug`

<br>
<hr>
 
### Rodando a aplicação SEM [Docker](https://www.docker.com/)

 > :warning: Para rodar a aplicação desta forma, obrigatoriamente você deve ter o [Node](https://nodejs.org/en/) instalado em seu computador.
 > :warning: Atenção: Não esqueça de renomear/configurar o arquivo .env.example para os testes locais funcionarem.
 
<br>

- Clone o repositório `git@github.com:Rafael-Souza-97/store-manager.git`:

```bash
git clone git@github.com:Rafael-Souza-97/store-manager.git
```

<br>

- Entre na pasta do repositório que você acabou de clonar:

```bash
cd store-manager
```

 > Execute a aplicação com `npm start` ou `npm run debug`

<hr>

### Scripts

- Criar o banco de dados e gerar as tabelas:

```sh
  npm run migration
```

- Limpar e popular o banco de dados:

```sh
  npm run seed
```

- Executar os testes de unidade:

```sh
  npm run test:mocha
```

</details>
  
<br>

## Autor

- [Rafael Souza](https://github.com/Rafael-Souza-97)

## Referências

 - [Trybe](https://www.betrybe.com/)

## Tecnologias / Ferramentas utilizadas

- [API REST](https://blog.betrybe.com/desenvolvimento-web/api-rest-tudo-sobre/)
- [Express](https://expressjs.com/)
- [Node](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [Docker](https://www.docker.com/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Zoom](https://zoom.us/)
- [Slack](https://slack.com/intl/pt-br/)
- [VsCode](https://code.visualstudio.com/)
- [Git](https://git-scm.com/) & [GitHub](https://github.com/)
- [Linux - Ubuntu](https://ubuntu.com/)

## Testes

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Jest](https://jestjs.io/)

## Infos Adicionais

- ###### Percentual de cumprimento de requisitos ([Trybe](https://www.betrybe.com/))- 100%
  
## Preview

https://user-images.githubusercontent.com/99055008/202817990-b3183d67-827f-4077-8c2c-6649bcc5cfa0.mp4

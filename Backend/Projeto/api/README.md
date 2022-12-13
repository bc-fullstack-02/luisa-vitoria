<h1 align="center"> API - Sysmap Parrot </h1>
<h4 align="center"> API RestFul para a rede social Sysmap Parrot </h1>


------------


### 💻 Pré-requisitos
É necessário ter o git e o docker instalados. Para instalação:
- [Git](http://https://git-scm.com/downloads "Git")
- [Docker](http://https://www.docker.com/get-started/ "Docker Instalação")

------------

### 🚀 Iniciando a aplicação
- ##### Clone o repositório
` git clone https://github.com/bc-fullstack-02/luisa-vitoria/tree/main/Backend/Projeto/api`

- ##### Acesse a pasta criada e execute:
` docker-compose up -d`

- ##### Verifique se os containers foram iniciados e estão rodando:
`docker-compose ps`

- ##### É possível reiniciar os containers, caso não estejam rodando. Execute:
`docker-compose restart`

- ##### A aplicação será executada em:
`http://localhost:4000`


------------

 ### 🎲 Acessando a API
Para acessar a lista de recursos que estão disponíveis na API  e as operações que podem ser executadas, utilizou-se o Swagger.  A partir do Swagger-UI (interface gráfica) é possível explorar a aplicação. 

- ##### Gerando o arquivo de documentação Swagger: 
`npm run swagger-autogen`

	O arquivo swagger_output.json será gerado automaticamente.
- ##### Para visualizar as rotas, modelos e interagir com a API, acessar: 
`http://localhost:4000/doc`

- ##### Para popular o banco de dados com dados iniciais, executar: 
`http://localhost:4000/v1/seed`

- ##### Para visualizar os logs da API, executar: 
`docker-compose logs backend-1`

- ##### Para verificar os dados no banco de dados, pode-se utilizar o MongoDB Compass: 
[Download MongoDB Compass](http://https://www.mongodb.com/try/download/compass "Download MongoDB Compass")

------------

### :loudspeaker: Visualizando notificações
As notificações serão emitidas ao usuário quando os perfis que o usuário segue fizerem um post, comentário em algum post do usuário, e realizar curtidas.

- ##### Para visualizar notificações, acessar: 
`localhost:4000/index.html`

------------

### :outbox_tray:  Realizando upload de imagens
Para esta funcionalidade, será utilizado o servidor de armazenamento de objetos MinIO. As imagens serão armazenadas no bucket "first-bucket".

- ##### Para realizar o upload de imagem, acessar: 
`localhost:4000/upload.html`

- ##### Para acessar o MinIO e verificar as imagens armazenadas: 
`localhost:9001/buckets`

	É necessário realizar o login usando as chaves BUCKET_ACCESS_KEY e BUCKET_SECRET_KEY, disponíveis no arquivo docker-compose.yml
  
 ------------
 
 ### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção da API:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/en/)
- [MongoDB](https://www.mongodb.com/)
- [JSONWebToken](https://jwt.io/)
- [MinIO](https://min.io/)
- [Swagger](https://swagger.io/)

  
 ------------
 

### :writing_hand: Autora

<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/70411877?v=4" width="100px;" alt=""/> 
<a  href="https://github.com/luisavitoria"><sub><b>Luísa Vitória Anjos </b></sub></a> <a href="https://github.com/luisavitoria">:woman_technologist:</a>

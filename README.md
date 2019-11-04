# psp-pag

## API - pagarme

Pré-requisitos:

- Docker (https://docs.docker.com/install/)
- Docker-compose (https://docs.docker.com/compose/install/)
- Node JS (https://nodejs.org/en/)
- Git (https://git-scm.com/downloads)

- Typescript (https://www.npmjs.com/package/typescript).
  use o comando "npm install -g typescript", deve ser instalado após o node JS.

Instalação:

Abra um terminal (ou prompt se estiver no windows), escolha uma pasta para baixar o projeto e digite:

  "git clone https://github.com/sandrosborges/psp-pag.git" e dê um enter.
  
  1.  Navegue até a pasta: "/psp-pag/app2/db/docker/:
  2.  execute o comando: "docker-compose ps " [ENTER], para verificar os status dos serviços docker-compose. Na primeira vez, o   resultado deve ser:
  
          Name                    Command               State           Ports         
  ----------------------------------------------------------------------------------
        
      Indicando que não existe nenhum serviço ativo.
  3.  Inicie os serviços, com o comando: "docker-compose up -d" [ENTER] Pode verificar os serviços utilizando o comando         anterior ("docker-compose ps " [ENTER]). O resultado deverá ser parecido com este:
  
          Name                    Command               State           Ports         
  ----------------------------------------------------------------------------------
  docker_adminer_1   entrypoint.sh docker-php-e ...   Up      0.0.0.0:8080->8080/tcp   
  docker_db_1        docker-entrypoint.sh postgres    Up      0.0.0.0:5432->5432/tcp 
  
  
  
  4. Já temos o "Adminer" executando em http://localhost:8080/, acesse e escolha PostgreSQL:
  
    Server:   db
    Username: postgres
    Password: password
    Database: psp

 5. Instale as dependências do projeto a partir da pasta /psp-pag/app2/, com o comando: "npm i"
 6. Execute a transpilação da aplicação a partir da pasta /psp-pag/app2/, com o comando: "tsc"
 6. Execute a aplicação a partir da pasta /psp-pag/app2/, com o comando: "npm ./Dist/main.js"
 7. A aplicação pode ser acessada em http://localhost:3000. As seguintes rotas foram criadas:
    - [POST] http://localhost:3000/transaction, enviando:    
      body: {
              "vl_tran": 0,
              "ds_tran": "string",
              "pay_method": "string",
              "card_number": "string",
              "card_bearer": "string",
              "card_valid_thru": "string",
              "card_cvv": "string",
              "cod_pdv": "string"
            }
          Para o comando post, poderá ser utilizado o POSTMAN ou Talented API tester (ambos são extensões do Chrome).
    
    - [GET] http://localhost:3000/transaction
    - [GET] http://localhost:3000/transaction/{id}
    - [GET] http://localhost:3000/payable/
    - [GET] http://localhost:3000/payable/{id}
    - [GET] http://localhost:3000/payable/extrato/{codPDV}
    
    Obs.: Também pode acessar a documentação swagger em:  http://localhost:3000/api-docs/
    

7. Para executar os testes, pare a aplicação e a partir da pasta /psp-pag/app2/, execute o comando: "npm test"

#### OBS: Para executar sem o docker, utilizando um outro server Postgres, basta executar o script de inicialização do BD, que fica na pasta "/app2/db/docker/scripts/init.sql" e alterar a connection string editando o arquivo de configuração da aplicação em "/app2/common/environment.ts"

#### OBS2: Não foi implementada a segurança da API (JWT) e também a forma abordada para cálculo de saldo não é recomendada para ambiente produtivo.
 
 
 
  
  
  








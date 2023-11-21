# Sistema Simples de Login
feito um sistema simples de login usando **JWT** para criação de tokens, **nodejs**, **dotenv** para armazenamento de variáveis, **fastify** para criação de rotas e **mariaDB** para banco de dados

## Funcionalidades
Primeiro temos a rota post /cadastro para se cadastrar, onde ele espera dados nome,email,senha e telefone, depois tem a rota post /login para realizar o login, informando o email e senha e para recuperar os dados usa a rota get /recupera informando o token na parte de autenticação 

## Como usar
Para usar e simples, apenas se cadastrar, depois ja pode se logar e verificar seus dados, ele so nao retorna a senha por motivos de segurança 

### Conexão com Banco de Dados
Foi feito a conexão usando **Mysql2**, onde temos as tabelas infos, para guardar informações pessoas, dates, para guardar as datas e a tabela define para interligar as duas

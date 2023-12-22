# RESTful API em TypeScript
Para a construção da API foi utilizado TypeScript com Node.js e Express. Além disso, há diversas funcionalidades como a autenticação por token JWT, criptografia de senhas, banco de dados SQL com migrations e seeds.

## Instalação
1. Clone o repositório:
```
git clone https://github.com/lucas-bernardino/api-node.gi
```
2. Entre na pasta clonada:
```
cd api-node
```
3. Instale as dependências:
```
yarn install
```



**Antes de inicializar o projeto, certifique-se de criar e preencher o arquivo `.env` com as suas varíaveis de ambiente, tais como ilustradas no arquivo `.env.example`**



## Iniciar
1. Inicie o projeto com:
```
yarn start
```



## Banco de dados
1. Para as migrations, rode:
```
yarn knex:migrate
```

2. É possível utilizar seeds para preencher o banco de dados das cidades com todas as cidades de Santa Catarina:
```
yarn knex:seeds
```

3. Para excluir a ultima tabela criada:
```
yarn knex:rollback
```

4. Para excluir todas as tabelas:
```
yarn knex:rollback-all
```



## Estrutura do projeto:
O sistema consiste, essencialmente, em três entidades:
- Cidades
- Pessoas
- Usuários

Cada pessoa está relacionada a somente uma cidade. Só é possível adicionar novas cidades ou pessoas ao estar cadastrado e logado na página com um token JWT válido.
Cada cidade possuem as propriedades de nome e id, enquanto os usuários possuem nome, id, email e o id da cidade a qual pertencem.

## Endpoints da API:
### 1. Cidades

#### Obter todas as cidades
- Método
```
get
```
- Rota:
```
/cidades
```
- Paramêtros (query):
```
id
page
limit
filter
``` 
#### Obter cidade por ID
- Método
```
get
```
- Rota:
```
/cidades
```
- Paramêtros (params):
```
id
```
#### Criar cidade
- Método
```
post
```
- Rota:
```
/cidades
```
- Paramêtros (body):
```
{
    "nome": "nome_da_cidade"
}
```
#### Atualizar cidade por ID
- Método
```
put
```
- Rota:
```
/cidades
```
- Paramêtros (params):
```
id
```
- Paramêtros (body):
```
{
    "nome": "nome_da_nova_cidade"
}
``` 
#### Deleter cidade por ID
- Método
```
delete
```
- Rota:
```
/cidades
```
- Paramêtros (params):
```
id
```

### 2. Pessoas

#### Obter todas as pessoas
- Método
```
get
```
- Rota:
```
/pessoas
```
- Paramêtros (query):
```
page
limit
filter
``` 
#### Obter pessoa por ID
- Método
```
get
```
- Rota:
```
/pessoas
```
- Paramêtros (params):
```
id
```
#### Criar pessoa
- Método
```
post
```
- Rota:
```
/pessoas
```
- Paramêtros (body):
```
{
    "nome": "nome_da_pessoa",
    "email": "email_da_pessoa",
    "cidadeId": "id_cidade_da_pessoa",
}
```
#### Atualizar pessoa por ID
- Método
```
put
```
- Rota:
```
/pessoas
```
- Paramêtros (params):
```
id
```
- Paramêtros (body):
```
{
    "nome": "nome_da_pessoa",
    "email": "email_da_pessoa",
    "cidadeId": "id_cidade_da_pessoa",
}
``` 
#### Deleter pessoa por ID
- Método
```
delete
```
- Rota:
```
/pessoas
```
- Paramêtros (params):
```
id
```

### 3. Usuários

#### Cadastrar usuário
- Método
```
post
```
- Rota:
```
/cadastrar
```
- Paramêtros (body):
```
{
    "email": "email_do_usuario",
    "senha": "senha_da_usuario",
    "nome": "nome_da_usuario",
}
```
#### Logar usuário
- Método
```
post
```
- Rota:
```
/entrar
```
- Paramêtros (body):
```
{
    "email": "email_do_usuario",
    "senha": "senha_da_usuario",
}
```

Após o usuário ser logado, será enviado um **accessToken** que deverá ser enviado para todas as rotas de cidades e pessoas no **header** para que ele tenha autorização.
```
{
    "authorization": "Bearer accessToken_do_usuario"
}
```

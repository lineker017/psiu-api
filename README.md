# Psiu API

## Requisitos

### Aluno
- [X] Cadastrar um aluno
 - [X] Não deve ser possível cadastrar RA já cadastrado
 - [X] Gerar senha aleatória para primeiro acesso
 - [x] Criar hash para a senha aleatória gerada

- [x] Editar aluno
 - [x] Deve ser possível alterar o nome e data de nascimento do aluno
 - [x] Nao deve ser possivel atualizar um aluno inativo

- [] Atualizar senha
 - [] Não deve ser possível colocar uma senha fraca

- [x] Deletar aluno
  - [x] Deve utilizar soft delete
  - [x] Nao deve ser possivel deletar um aluno inativo
 
- [x] Buscar alunos
  - [] Criar paginaçao na busca de alunos

### Autenticação 

- [] Autenticaçao com senha
  - [] Verificar se o RA existe
  - [] Criar um token de autenticaçao 


### Post

- [] Criar post
- [] Editar post
- [] Deletar post
- [] Buscar posts
- [] Buscar posts por aluno

### ComentarioPostagem

- [] Criar comentário
- [] Editar comentário
- [] Deletar comentário

### Reacaodepoimento

- [] Criar reação
- [] Deletar reação

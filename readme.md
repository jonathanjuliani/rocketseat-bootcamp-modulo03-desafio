# Desafio 02. Iniciando aplicação backend

Este é um repo criado para mostrar o resultado do desafio 3 do bootcamp da rocketseat. O desafio consiste em:

A partir da aplicação criada no desafio 2, evoluir a aplicação com os seguintes pontos:

### Gerenciamento de Meetups

- uma rota para upload de imagens que serão utilizadas como banners dos eventos
- o usuário pode cadastrar meetups na plataforma com titulo, descrição, localização, data&hora e imagem do evento
- não deve ser possível cadastrar meetups com datas que já passaram
- o usuário deve conseguir editar o meetup o qual ele é o organizador
- deve existir uma rota que lista os meetups que são organizados pelo usuário logado
- o usuário pode cancelar um meetup o qual ele é organizador, e isso deve deletar o evento da base de dados

### Inscrições

- O usuário deve poder se inscrever em meetups que não organiza.
- O usuário não pode se inscrever em meetups que já aconteceram.
- O usuário não pode se inscrever no mesmo meetup duas vezes.
- O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.
- Sempre que um usuário se inscrever no meetup, envie um e-mail ao organizador contendo os dados relacionados ao usuário inscrito.

### Resumo

Libs utilizadas até o momento:

- bcryptjs
- express
- jsonwebtoken
- pg
- pg-hstore
- sequelize
- yup

Dev dependencies:

- eslint
- eslint-config-airbnb-base
- eslint-config-prettier
- eslint-plugin-import
- eslint-plugin-prettier
- nodemon
- prettier
- sequelize-cli
- sucrase

Tudo isso configurado e funcionando, bora pro próximo desafio!

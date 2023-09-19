# Locadora-Teste-LabsIf

LabsIF : sistema para gerenciamento de uma locadora de carros 


# Indice 

<a name="ancora"></a>

- [Teste](#ancora1)
- [Requisitos](#ancora2)
- [Escopo](#ancora3)
- [Criterios de Avaliação](#ancora4)
- [Dicas](#ancora5)
- [Instruções](#ancora6)

#
<a id="ancora1"></a>
# Teste

O desafio é criar o backend para um sistema de gerenciamento de uma locadora de carro.



#
<a id="ancora2"></a>
# Requisitos:

<li> Desenvolver uma API RESTful que implemente as operações CRUD (Create, Read, Update, Delete). </li>
<li> A API deve ser integrada com um banco de dados relacional, como MySQL ou Sqlite. </li>
<li> A API deve ser desenvolvida usando uma dessas linguagens de programação  Python, PHP ou Node.js. </li>

#
<a id="ancora3"></a>
# Escopo:

A API deve suportar as seguintes operações CRUD:

[POST] /carros :Criar um carro, deve permitir que um usuário crie um novo carro, fornecendo as informações básicas, como modelo, marca, descrição, preço de aluguel e categoria.

[POST] /carros/alugar : Alugar um carro, deve permitir que um usuário alugue um carro, fornecendo o ID do carro, a data e hora de início do aluguel e a data e hora de fim do aluguel.

[GET] /carros : Listar todos os carros, deve permitir que um usuário liste todos os carros.

[GET] /carros/{id} : Listar carro, apenas um carro específico, fornecendo o ID do carro.


[PUT] /carros/{id} : Atualizar um carro, deve permitir que um usuário atualize as informações de um carro existente, fornecendo o ID do carro e as informações a serem atualizadas.

[DELETE] /carros/{id}: Excluir um carro, deve permitir que um usuário exclua um carro existente, fornecendo o ID do carro.

[GET] /carros/disponiveis : Listar carros disponíveis, essa operação deve retornar uma lista de todos os carros que estão disponíveis para aluguel.

[GET] /carros/alugados :Listar carros alugados, essa operação deve retornar uma lista de todos os carros que estão alugados.

#
<a id="ancora4"></a>
# Critérios de avaliação:

<li> A API deve estar completa e funcionando de acordo com os requisitos. </li>
<li>A API deve ser bem estruturada e organizada.</li>
<li>A API deve ser testável, para facilitar o desenvolvimento e testes da API, utilize umas das ferramentas Postman ou Insomnia para realizar as requisições HTTP.</li>

# 
<a id="ancora5"></a>
# Dicas : 

<li>Comece pelo básico e implemente as operações CRUD básicas primeiro.</li>
<li>Use uma ferramenta de banco de dados para criar o esquema do banco de dados.</li>
<li>Faça um boa documentação da api, utilizando  swagger. </li>

#
<a id="ancora6"></a>
# Intruções:

<li> Para o inicio do teste, faça um clone desse repositorio ou um fork </li>
<li> Ao final do teste envie para esse endereços com o assunto "Teste Labs Backend" :  amanda.tavares@labsif.com.br /  contato@labsif.com.br </li>
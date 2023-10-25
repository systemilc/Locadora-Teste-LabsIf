# API de Aluguel de Carros

Uma API simples para gerenciar carros disponíveis para aluguel. Esta API utiliza as seguintes bibliotecas e tecnologias:

- [Express.js](https://expressjs.com/): Um framework Node.js para construir APIs web.
- [Swagger/OpenAPI](https://swagger.io/): Uma ferramenta para criar documentação e definir especificações para APIs RESTful.
- [date-fns](https://date-fns.org/): Uma biblioteca para manipulação de datas em JavaScript.
- [SQLite](https://www.sqlite.org/): Um banco de dados SQL embutido.

- ## Vídeo de Demonstração

 [aqui](https://youtu.be/tm838A-FDkI).
Assista ao vídeo de demonstração [![AQUI]](https://youtu.be/tm838A-FDkI){:target="_blank"}


## Configuração e Uso

### Pré-requisitos

Certifique-se de ter [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) instalados em sua máquina.

### Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/api-aluguel-carros.git
   cd api-aluguel-carros

2. Instale todas as dependências:
 ```bash
    npm install
 ```

### Executando a API
Para iniciar a API, execute o seguinte comando:


 ```comando
     npm run dev
 ```
 A API estará disponível em http://localhost:3000. Você pode personalizar a porta no arquivo config.js.

### Documentação da API
A documentação da API é fornecida usando o Swagger/OpenAPI. Você pode acessar a documentação em http://localhost:3000/api-docs.

### Criação do banco
Caso precise recriar o banco de dados, execute o comando abaixo:
 ```comando
     node ./src/database/database.js
 ```

### Rotas de Exemplo
Aqui estão algumas das rotas disponíveis na API:

- Listar todos os carros: GET /carros
- Listar carros disponíveis: GET /carros/disponiveis
- Listar carros alugados: GET /carros/alugados
- Obter detalhes de um carro por ID: GET /carros/{id}
- Atualizar detalhes de um carro por ID: PUT /carros/{id}
- Deletar um carro por ID: DELETE /carros/{id}
- Adicionar um novo carro: POST /carros
- Alugar um carro: POST /carros/alugar
- Certifique-se de consultar a documentação completa para obter detalhes sobre os parâmetros, respostas e exemplos de uso.

### Contribuindo
Se desejar contribuir com melhorias ou correções, sinta-se à vontade para criar um fork deste repositório e enviar um pull request. Ficarei feliz em revisar e aceitar contribuições.

### Licença
Este projeto está licenciado sob a Licença MIT.

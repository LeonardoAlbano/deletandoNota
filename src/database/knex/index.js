// Importa o arquivo de configuração do Knex.
const config = require("../../../knexfile");

// Importa o módulo Knex.
const knex = require("knex");

// Cria uma instância do Knex usando as configurações definidas para o ambiente de desenvolvimento no knexfile.
const connection = knex(config.development);

// Exporta a instância do Knex configurada para a conexão com o banco de dados.
module.exports = connection;

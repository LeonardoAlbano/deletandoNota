// Importa o módulo 'path' do Node.js, utilizado para manipulação de caminhos de arquivos.
const path = require("path");

// Inicia a exportação do objeto de configuração.
module.exports = {

  // Define as configurações para o ambiente de desenvolvimento.
  development: {
    // Especifica que o banco de dados a ser usado é o SQLite3.
    client: 'sqlite3',
    
    // Configura a propriedade de conexão.
    connection: {
      // Especifica o caminho do arquivo do banco de dados SQLite3.
      // '__dirname' representa o diretório atual do arquivo.
      // Usa o módulo 'path' para resolver o caminho completo até o arquivo "database.db" dentro do diretório "src/database/".
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },

    pool:{
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },

    // Configuração para a localização dos arquivos de migração.
    migrations: {
      // Especifica o diretório onde os arquivos de migração estão localizados.
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },

    // Define 'null' como valor padrão para as colunas que não têm um valor especificado.
    useNullAsDefault: true
  }
};

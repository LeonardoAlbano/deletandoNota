// Função de migração para criar a tabela "notes".
exports.up = knex => knex.schema.createTable("tags", table => {
    // Coluna de identificação única e autoincrementada.
    table.increments("id");

    // Coluna de título do tipo texto.
    table.text("name").NotNullable();

    // Coluna de usuário associado, usando uma chave estrangeira referenciando a tabela "users".
    table.integer("note_id").references("id").inTable("note").onDelete("CASCADE");

    // Coluna de usuário associado, usando uma chave estrangeira referenciando a tabela "users".
    table.integer("user_id").references("id").inTable("users");

});

// Função de migração para desfazer a criação da tabela "notes".
exports.down = knex => knex.schema.dropTable("tags");

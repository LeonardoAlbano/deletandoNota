// Função de migração para criar a tabela "notes".
exports.up = knex => knex.schema.createTable("notes", table => {
    // Coluna de identificação única e autoincrementada.
    table.increments("id");

    // Coluna de título do tipo texto.
    table.text("title");

    // Coluna de descrição do tipo texto.
    table.text("description");

    // Coluna de usuário associado, usando uma chave estrangeira referenciando a tabela "users".
    table.integer("user_id").references("id").inTable("users");

    // Coluna de data e hora de criação, com valor padrão como a data e hora atuais.
    table.timestamp("created_at").default(knex.fn.now());

    // Coluna de data e hora de última atualização, com valor padrão como a data e hora atuais.
    table.timestamp("updated_at").default(knex.fn.now());
});

// Função de migração para desfazer a criação da tabela "notes".
exports.down = knex => knex.schema.dropTable("notes");

// Define a migração para criar a tabela "links" no banco de dados.
exports.up = knex => knex.schema.createTable("links", table => {
  // Define uma coluna "id" que autoincrementa e serve como chave primária.
  table.increments("id");

  // Define uma coluna "url" do tipo texto que não pode ser nula.
  table.text("url").notNullable();

  // Define uma coluna "note_id" que referencia a coluna "id" da tabela "notes".
  // Adiciona uma restrição para deletar automaticamente os links associados quando uma nota é deletada.
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");

  // Define uma coluna "created_at" do tipo timestamp com valor padrão definido como a data e hora atuais.
  table.timestamp("created_at").default(knex.fn.now());
});

// Define a migração para deletar a tabela "links" do banco de dados.
exports.down = knex => knex.schema.dropTable("links");

// Importa o módulo 'knex' para realizar operações no banco de dados.
const knex = require("../database/knex");

// Cria uma classe chamada NotesController para lidar com operações relacionadas a notas.
class NotesController {
    // Método assíncrono para criar uma nova nota.
    async create(request, response) {
        // Extrai informações do corpo da requisição.
        const { title, description, tags, links } = request.body;

        // Extrai o ID do usuário da requisição.
        const { user_id } = request.body;

        // Insere uma nova nota no banco de dados e obtém o ID da nota criada.
        const [ note_id ] = await knex("notes").insert({
            title,
            description,
            user_id
        });

        // Cria um array de objetos para inserir os links no banco de dados, associando-os à nota criada.
        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            };
        });

        // Insere os links associados à nota no banco de dados.
        await knex("links").insert(linksInsert);

        // Cria um array de objetos para inserir as tags no banco de dados, associando-as à nota criada.
        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            };
        });

        // Insere as tags associadas à nota no banco de dados.
        await knex("tags").insert(tagsInsert);

        // Responde à requisição com uma resposta JSON vazia.
        response.json();
    }

    // Método assíncrono chamado "show" que recebe uma requisição e uma resposta.
    async show(request, response) {
        // Extrai o parâmetro "id" da URL da requisição.
        const { id } = request.params;
    
        // Utiliza o Knex para realizar uma consulta à tabela "notes" no banco de dados.
        // O método "where" filtra os registros onde a coluna "id" é igual ao parâmetro extraído da URL.
        // O método "first" retorna apenas o primeiro resultado da consulta.
        const note = await knex("notes").where({ id }).first();

        // Realiza uma consulta à tabela "tags" para obter as tags associadas à nota, ordenadas pelo nome.
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    
        // Realiza uma consulta à tabela "links" para obter os links associados à nota, ordenados pela data de criação.
        const links = await knex("links").where({note_id: id}).orderBy("created_at");

        // Retorna uma resposta JSON contendo o resultado da consulta.
        return response.json({
            ...note,
            tags,
            links
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("notes").where({ id }).delete();

        return response.json();
    }
}

// Exporta a classe NotesController para ser utilizada em outros arquivos.
module.exports = NotesController;

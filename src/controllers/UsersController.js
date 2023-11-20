// Importa o módulo de criptografia de senha bcryptjs para segurança.
const { hash, compare } = require("bcryptjs")

// Importa a classe de erro personalizada "AppError".
const AppError = require("../utils/AppError");

// Importa a conexão SQLite do arquivo correspondente.
const sqliteConnection = require("../database/sqlite")

// Classe UsersController para manipular operações relacionadas a usuários.
class UsersController {
  /**
   * Métodos da API RESTful:
   *  Index - GET para listar vários registros
   *  Show - GET para exibir um registro específico 
   *  Create - POST para criar um registro
   *  Update - PUT para atualizar um registro
   *  Delete - DELETE para remover um registro
   */

  // Método para criar um novo usuário.
  async create(request, response) {
    // Extrai os dados do corpo da requisição.
    const { name, email, password } = request.body;

    // Conecta ao banco de dados SQLite.
    const database = await sqliteConnection();

    // Verifica se já existe um usuário com o mesmo e-mail no banco de dados.
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    // Se o usuário já existe, lança um erro.
    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    // Hash da senha usando bcrypt (com custo de 8 rounds).
    const hashedPassword = await hash(password, 8);

    // Insere o novo usuário na tabela de usuários no banco de dados.
    await database.run("INSERT INTO users(name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // Retorna uma resposta de sucesso (status 201).
    return response.status(201).json();
  }

  // Método para atualizar as informações de um usuário existente.
  async update(request, response) {
    // Extrai os dados do corpo da requisição e parâmetros da URL.
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    // Conecta ao banco de dados SQLite.
    const database = await sqliteConnection();

    // Busca o usuário pelo ID no banco de dados.
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    // Verifica se o usuário existe.
    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    // Busca um usuário com o mesmo e-mail no banco de dados.
    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    // Verifica se já existe um usuário com o e-mail fornecido, excluindo o usuário atual.
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    // Atualiza as propriedades do usuário com os novos valores. 
    // Caso não tiver nenhum conteudo, será o mesmo nome que já está 
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    // Verifica se a senha foi fornecida e se a senha antiga foi fornecida.
    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
    }

    // Se a senha foi fornecida, verifica se a senha antiga é válida.
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      // Se a senha antiga não corresponde, lança um erro.
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      // Hash da nova senha usando bcrypt (com custo de 8 rounds).
      user.password = await hash(password, 8);
    }

    // Executa a consulta SQL para atualizar o usuário no banco de dados.
    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    // Retorna uma resposta de sucesso.
    return response.json();
  }
}

// Exporta a classe UsersController para ser utilizada em outros arquivos.
module.exports = UsersController;

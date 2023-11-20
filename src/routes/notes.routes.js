// Importa o módulo Router do Express, que permite a criação de rotas.
const { Router } = require("express");

// Importa o controlador NotesController que contém a lógica para manipular operações relacionadas a usuários.
const NotesController = require("../controllers/NotesController");

// Cria uma instância do Router para definir as rotas relacionadas aos usuários.
const notesRoutes = Router();

// Middleware personalizado chamado myMiddleware.
/**
 * Este é um middleware personalizado chamado myMiddleware. 
 * Ele verifica se o usuário tem a propriedade isAdmin definida 
 * como true no corpo da requisição. 
 * Se não, ele retorna uma resposta JSON
 * indicando que o usuário não está autorizado. 
 * Se o usuário for autorizado, a função next() 
 * é chamada para continuar o fluxo da requisição
 */
/*
function myMiddleware(request, response, next) {
  if (!request.body.isAdmin) {
    return response.json({ message: "User unauthorized" });
  }
  next();
}
*/

// Cria uma instância do NotesController para acessar seus métodos.
const notesController = new NotesController();

// Define uma rota que responde a requisições HTTP do tipo POST no caminho "/".
// myMiddleware é aplicado apenas a esta rota específica.
notesRoutes.post("/:user_id", notesController.create);

// Define uma rota que responde a requisições HTTP do tipo GET no caminho "/:id".
// myMiddleware não é aplicado a esta rota, o que significa que não há verificação de autorização.
notesRoutes.get("/:id", notesController.show);

notesRoutes.delete("/:id", notesController.delete);

// Exporta as rotas definidas para que possam ser usadas em outros lugares do aplicativo.
module.exports = notesRoutes;

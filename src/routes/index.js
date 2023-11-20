// Importa o módulo Router do Express.
const { Router } = require("express");

// Importa as rotas relacionadas aos usuários do arquivo user.routes.js.
const userRoutes = require("./user.routes");
const notesRoutes = require("./notes.routes");

// Cria uma instância do Router para definir as rotas principais.
const routes = Router();

// Usa as rotas relacionadas aos usuários no caminho "/users".
routes.use("/users", userRoutes);

// Usa as rotas relacionadas as notas no caminho "/notes".
routes.use("/notes", notesRoutes);


// Exporta as rotas principais para serem utilizadas em outros lugares do aplicativo.
module.exports = routes;

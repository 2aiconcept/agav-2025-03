const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('mock_db/db.json');
const middlewares = jsonServer.defaults();
// Routes protégées par l'authentification
server.db = router.db; // Permet à json-server-auth d'accéder à la base
server.use(middlewares);
server.use(auth);
server.use(router);
// Lancer le serveur sur le port 3000
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});

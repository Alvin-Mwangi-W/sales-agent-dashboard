const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Point to your data file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(process.env.PORT || 3002, () => {
  console.log('JSON Server is running on port:', process.env.PORT || 3002);
});
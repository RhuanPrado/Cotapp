const express = require('express');

const routes = express.Router();

const ProductController = require ('./controllers/ProductController');
const CotacaoController = require ('./controllers/CotacaoController');
const IncluirProdController = require ('./controllers/IncluirProdController');
const FornecedorController = require ('./controllers/FornecedorController');
const ListValuesController = require('./controllers/ListValuesController');
const PedidoController = require('./controllers/PedidoController');
const CotPartController = require('./controllers/CotPartController');
const GerarCandidatosController = require('./controllers/GerarCandidatosController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');

routes.post('/product', ProductController.store);
routes.get('/products', ProductController.index);
routes.get('/productsCot', ProductController.indexProductsCot);
routes.delete('/product/:productId', ProductController.delete);
routes.put('/product/:productId',ProductController.update);

routes.put('/cotacao/:productId/inccotacao', IncluirProdController.store);
routes.put('/cotacao/:productId/delcotacao', IncluirProdController.delete);

routes.delete('/cotacao/:cotacaoId', CotacaoController.delete);
routes.post('/cotacao', CotacaoController.store);
routes.get('/cotacao', CotacaoController.index);
routes.put('/cotacao/:cotacaoId', CotacaoController.update);
routes.get('/oneCot/:idCot', CotacaoController.indexOne);


routes.post('/fornecedor', FornecedorController.store);
routes.put('/fornecedor/:fornecedorId', FornecedorController.update);
routes.delete('/fornecedor/:fornecedorId', FornecedorController.delete);
routes.get('/fornecedor', FornecedorController.index);

routes.post('/user', UserController.store);
routes.put('/user/:userId', UserController.update);
routes.delete('/user/:userId', UserController.delete);
routes.get('/user', UserController.index);

routes.put('/cotacao/list/:listId', ListValuesController.store);
routes.delete('/cotacao/list/:listId', ListValuesController.delete);

routes.post('/cotacao/participar/:cotId', PedidoController.store);
routes.delete('/cotacao/participar/:cotId', PedidoController.delete);

routes.get('/listCotPart', CotPartController.index);

routes.post('/cotacao/gerarCot/:cotId', GerarCandidatosController.gerarCot);

routes.post('/loginU', SessionController.loginUser);
routes.post('/loginpass', SessionController.loginPass);
//criar rotas faltantes

module.exports = routes;
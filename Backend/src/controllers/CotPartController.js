const Cotacao = require('../models/Cotacao');
const Fornecedor = require('../models/Fornecedor');


module.exports = {
    async index(req, res){
        const {forn} = req.headers;

        const fornecedor = await Fornecedor.findById(forn);

        if(!fornecedor){
            return res.status(400).json({ error: 'fornecedor not exists'});
        }

        const cotacoes = await Cotacao.find({
            _id: { $in: fornecedor.cotacoes}
        });

        return res.json(cotacoes);
    }
}
const Pedido = require('../models/Pedido');
const Fornecedor = require('../models/Fornecedor');
const Cotacao = require('../models/Cotacao');

module.exports = {
    async store(req, res){
        
        const {cotId} = req.params;
        const {forn} = req.headers;

        const fornecedor = await Fornecedor.findById(forn);
        const cotacao = await Cotacao.findById(cotId);

        if(!fornecedor){
            return res.status(400).json({ error: 'fornecedor not exists'});
        }

       if(!cotacao){
           return res.status(400).json({ error: 'cotacao not exists'});
        }

        const pedido = await Pedido.create({
            idCot: cotacao._id,
            idF: fornecedor._id,
            produtos:[]
        });

        fornecedor.pedidos.push(pedido._id);
        fornecedor.cotacoes.push(cotacao._id);
        await fornecedor.save();

        return res.json(fornecedor);
    },

    async delete( req, res){
        const {cotId} = req.params;
        const {forn} = req.headers;

        const fornecedor = await Fornecedor.findById(forn);
        const cotacao = await Cotacao.findById(cotId);

        if(!fornecedor){
            return res.status(400).json({ error: 'fornecedor not exists'});
        }

       if(!cotacao){
           return res.status(400).json({ error: 'cotacao not exists'});
        }

        const pedido = await Pedido.find({
            $and:[
                {idCot: {$in: cotacao._id}},
                {idF: {$in: fornecedor._id}}
            ]
        });

        const del = await Pedido.deleteOne(pedido._id);

        fornecedor.pedidos.pop({_id: pedido._id});
        fornecedor.cotacoes.pop(cotacao._id);

        await fornecedor.save();

        return res.json(fornecedor);
    }
};
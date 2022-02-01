const Cotacao = require('../models/Cotacao');
const Fornecedor = require('../models/Fornecedor');
const User = require('../models/User');

module.exports = {

    async indexOne(req, res){
        const {idCot} = req.params;
        const cotacao = await Cotacao.findById(idCot);

        if(!cotacao){
            return res.status(400).json('Cotação not exists');
        }

        return res.json(cotacao)
    },

    async index(req, res){
        
        const { forn, id, find } = req.headers;
        var cotacao
        if(Number(find) == 1){
            const user = await User.findById(id);
            console.log(user)
            cotacoes = await Cotacao.find({idUser: user._id});
            return res.json(cotacoes);
        }else
            if(Number(find) == 2){
                const fornecedor = Fornecedor.findById(forn)
                cotacoes = await Cotacao.find({
                    $and:[
                        { status: { $ne: false}},
                        { _id: { $nin: fornecedor.cotacoes }}
                    ]
                });
                return res.json(cotacoes);
            }else{
                cotacoes = await Cotacao.find();
                return res.json(cotacoes);
            }   

    },

    async store(req, res) {
        const {name,idU} = req.body;

        const cotacao = await Cotacao.create({
            name: name,
            idUser: idU,
            status: false
        });

        return res.json(cotacao);
    },

    async delete(req, res){
        const {cotacaoId} = req.params;

        const delCot = await Cotacao.findById(cotacaoId);

        if(!delCot){
            return res.status(400).json({error: "cotacao not exists"})
        }

        const del = await Cotacao.deleteOne({_id:delCot._id});
    
        return res.json(del);
    },

    async update(req, res){
        const {cotacaoId} = req.params;

        const upCot = await Cotacao.findById(cotacaoId);

        if(!upCot){
            return res.status(400).json({error: "cotacao not exists"})
        }

        if(!upCot.status){
            upCot.status = true;
            upCot.save();
            return res.json(upCot);
        }

        upCot.status = false;
        upCot.save();

        return res.json(upCot);
    }
};
const Fornecedor = require('../models/Fornecedor');



module.exports = {
    async index(req, res){
        const fornecedores = await Fornecedor.find();

        return res.json( fornecedores);
    },

    async store(req, res){

        const { name, password} = req.body;

        const fornecedorExists = await Fornecedor.findOne({name:name});

        if(fornecedorExists){
            return res.json(fornecedorExists);
        }

        var nameStr = String(name);
        const fornecedor = await Fornecedor.create({
            name: nameStr.toLowerCase,
            password: password,
            pedidos:[],
            cotacoes:[]
        });

        return res.json(fornecedor);
    },

    async update( req, res){
        const { name, password} = req.body;

        const {fornecedorId} = req.params;

        const fornecedor = await Fornecedor.findById(fornecedorId);

        if(!fornecedor){
            return res.status(400).json({error:"fornecedor not exists"});
        }

        const updateFornecedor = await Fornecedor.updateOne({_id:fornecedor._id},{
            $set:{
                name:name,
                password:password,
            }
        });

        return res.json(updateFornecedor);
    },

    async delete(req, res){
        const {fornecedorId} = req.params;

        const delFornecedor = await Fornecedor.findById(fornecedorId);

        if(!delFornecedor){
            return res.status(400).json({error: "fornecedor not exists"});
        }

        const del = await Fornecedor.deleteOne({_id: delFornecedor._id});

        return res.json(del);
    }
}
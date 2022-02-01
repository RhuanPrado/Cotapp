const ListValues = require('../models/ListValues');


module.exports = {

    async store( req, res){
        
        const {listId} = req.params;
        const {idF, value} = req.body;

        const listV = await ListValues.findById(listId);

        if(!listV){
            return res.status(400).json({error: 'list not exists'});
        }

        listV.values.push({
            _id:idF,
            value:value,
        });
        

        await listV.save();

        return res.json(listV);
    },

    async delete( req, res){
        const {listId} = req.params;
        const {forn} = req.headers;

        const listV = await ListValues.findById(listId);

        if(!listV){
            return res.status(400).json({error: 'list not exists'});
        }

        listV.values.pop({_id: forn});

        await listV.save();

        return res.json(listV);
    }


};
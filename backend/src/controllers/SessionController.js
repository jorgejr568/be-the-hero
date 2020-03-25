const connection = require('../database/connection');

module.exports= {
    async index(req, res){
        const { id } = req.body;

        const ong = await connection('ongs').where('id', id).select('*').first();


        if(!ong){
            res.status(400).json({error: "No ong found with this ID"});
        }

        return res.json(ong);
    }
}
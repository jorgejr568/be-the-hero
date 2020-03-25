const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {
    async index(req, res){
        const ongs = await connection('ongs').select('*');

        res.json(ongs);
    },

    async store(req, res){
        const data = req.body;

        data['id'] = crypto.randomBytes(4).toString('HEX')
        
        await connection('ongs').insert(data);
    
        res.json(data);
    }
}
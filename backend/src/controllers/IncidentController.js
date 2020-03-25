const connection = require('../database/connection')

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();

        let incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page-1) * 5)
            .select(['incidents.*','ongs.name as ong_name','ongs.email as ong_whatsapp','ongs.city as ong_city','ongs.uf as ong_uf']);


        incidents = await incidents.map(incident => {
            let returnable_incident = {
                ong: {}
            };

            for(incident_data in incident){
                if(incident_data.indexOf('ong_') > -1){
                    returnable_incident['ong'][incident_data.replace('ong_','')] = incident[incident_data];
                }
                else{
                    returnable_incident[incident_data] = incident[incident_data];
                }
            }

            return returnable_incident
        })

        res.header('X-Total-Count', count['count(*)'])
        res.json(incidents);
    },

    async store(req, res){
        const data = req.body;
        data['ong_id'] = req.headers.authorization;
        
        const [incidentID] = await connection('incidents').insert(data);
    
        data['id'] = incidentID;

        res.json(data);
    },


    async delete(req, res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;
        
        const query = connection('incidents').where('id', id).where('ong_id', ong_id);

        const incident = await query.first();

        if(!incident){
            return res.status(404).json({error: "Not found"});
        }

        query.delete();
        
        res.status(204).send();
    }
}
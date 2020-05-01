const knex = require('../database')

module.exports = {
    //Como podem ser as requisições
    //   /projects?user_id=5 ou apenas /projects
    //Está usando paginação, para percorrer para as próximas paginas /projects?page=2
    async index(req,res,next) {
        try {
            const { user_id, page = 1 } = req.query;

            const query = knex('projects')
            .limit(5)
            .offset((page-1) * 5)

            const countProjectUser = knex('projects').count()

            if(user_id){
                query
                    .where({ user_id })
                    .join('users', 'users.id', '=', 'projects.user_id') //Fazendo o Join entre a tabela de users e projects
                    .select('projects.*', 'users.username') // selecionado os valores que deverão ser retornados da tabela
                    .where('users.deleted_at',null)

                countProjectUser
                    .where({user_id})
            }

            const [count] = await countProjectUser;
            res.header('X-Total-Count', count["count"])

            const results = await query;

        return res.json(results)
        } catch (error) {
            next(error)
        }
    },

    async create(req,res,next){
        try {
            const { title, user_id} = req.body;

            await knex('projects').insert({
                title,
                user_id
            })

            return res.status(201).send()
            
        } catch (error) {
            next(error)
        }
    },
}

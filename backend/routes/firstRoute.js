

async function routes(fastify, option) {
    fastify.get('/', async (request, reply) =>{
        return {hello : "test"}
    });
}

export default routes;
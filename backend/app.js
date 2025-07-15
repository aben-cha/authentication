import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({
    logger: true
});


const start = async () => {
    try {
        await fastify.listen({
            port: process.env.PORT || 5000,
            host: 'localhost'
        });
        fastify.log.info(`Server runing on port ${fastify.server.address().port}`);
    } catch(err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

fastify.get('/', (req, res) => {
    return res.status(200).send({message: 'Hello from Fastify!'})
});

start();


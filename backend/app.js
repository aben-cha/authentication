import Fastify from "fastify";
import dotenv from "dotenv";
import routes from "./routes/auth.routes.js";
dotenv.config();

const fastify = Fastify({
    logger: true
});


fastify.register(routes, {prefix: '/api/v1'});

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

start();


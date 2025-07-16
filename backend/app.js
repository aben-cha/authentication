import Fastify from "fastify";
import dotenv from "dotenv";
import routes from "./routes/auth.routes.js";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

dotenv.config();

const fastify = Fastify({
    logger: true
});


fastify.register(fastifyJwt, {secret: process.env.JWT_SECRET});
fastify.register(fastifyCookie);

fastify.register(routes, {prefix: '/backend'});

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


export default fastify;


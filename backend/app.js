import Fastify from "fastify";
import dotenv from "dotenv";
import routes from "./routes/auth.routes.js";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { authenticate } from "./middlewares/auth.js";

dotenv.config();

const fastify = Fastify({
    logger: true
});


fastify.register(fastifyJwt, {secret: process.env.JWT_SECRET /* || secret_key */});
fastify.register(fastifyCookie);// cookie-parser

// Authentication decorator
fastify.decorate('authenticate', authenticate);

fastify.register(routes, {prefix: '/'});

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


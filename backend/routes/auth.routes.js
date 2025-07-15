import authController from '../controllers/auth.controller.js';

async function routes(fastify, option) {
    fastify.get('/login', authController.login);
    fastify.get('/signup', authController.signup);
    fastify.get('/logout', authController.logout);
}

export default routes;
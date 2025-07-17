import authController from '../controllers/auth.controller.js';

async function routes(fastify, option) {
    fastify.post('/signup', authController.signup);
    fastify.post('/login', authController.login);
    fastify.post('/logout', authController.logout);
}

export default routes;
import authController from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyAuth.js';

async function routes(fastify, option) {
    fastify.post('/signup', authController.signup);
    fastify.post('/login', authController.login);
    fastify.post('/logout', authController.logout);
    // fastify.post('/verify-email', authController.verifyEmail);
    fastify.get('/verify-email', authController.verifyEmail);
    fastify.get('/check-auth', { preHandler: verifyToken }, authController.checkAuth);
    // fastify.get('/profile', {preHandler : fastify.authenticate}, profileController.profile);
    // fastify.get('/profile', { preHandler: verifyToken }, profileController.getProfile);
}

export default routes;
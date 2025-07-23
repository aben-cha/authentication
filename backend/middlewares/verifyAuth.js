
export const verifyToken = async (request, reply) => {
    const token = request.cookies.token;

    try {
        if (!token) // should return if no return the code will continue executing
            return reply.code(401).send({ status: false, message: 'Unauthorized - no token provided'});
        
        await request.jwtVerify({ token });

        return reply.send({ 
            status: true,
            message: 'You are authenticated', 
            user: request.user 
        });

    } catch (error) {
        return reply.code(401).send({ status: false, message: 'Unauthorized' });
    }
}
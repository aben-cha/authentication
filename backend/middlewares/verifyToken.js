
export const verifyToken = async (request, reply) => {
    const token = request.cookies.token;
    console.log("token:----->  ", token);
    try {
        if (!token) // should return if no return the code will continue executing
            return reply.code(401).send({ status: false, message: 'Unauthorized - no token provided'});
        
        // await request.jwtVerify({ token, onlyVerify: true });
        
        const decoded = request.server.jwt.verify(token);
        request.user = decoded;
    
        console.log("=========Token verified successfully");

        // we don't send, for accessing the next function
        // return reply.send({ 
        //     status: true,
        //     message: 'You are authenticated', 
        //     user: request.user 
        // });

        
    } catch (error) {
        console.error("verifyToken error:", error);
        return reply.code(401).send({ status: false, message: 'Unauthorized' });
    }
}

/*
By default, request.jwtVerify() looks for the token in the Authorization header (e.g., Bearer <token>).
🔧 How to fix it?
✅ Option 1. Use jwtVerify with token option and onlyVerify mode
It tells Fastify JWT to verify the passed token directly, without checking request headers.

🔧 Option 2. Use fastify.jwt.verify instead
const decoded = fastify.jwt.verify(token);
request.user = decoded;
✔ But then you must set request.user manually, unlike request.jwtVerify() which sets it automatically.
*/ 
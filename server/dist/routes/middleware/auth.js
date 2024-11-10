import jwt from 'jsonwebtoken';
const { verify } = jwt;
// Create a middleware function that blocks unauthicated users from triggering user ONLY routes
export const blockGuests = (req, res, next) => {
    // TODO: Retrieve the token cookie from req.cookies
    const token = req.cookies.token;
    // TODO: If the token cookie does not exist, send a 401 json response message and return
    if (!token) {
        res.status(401).json({ message: 'No cookie, no access' });
        return;
    }
    // TODO: If the token exists, validate it with the verify function, ( ie. verify(token, process.env.JWT_SECRET) )
    try {
        verify(token, process.env.JWT_SECRET);
        // TODO: If it verifies, call next to move the request on to the controller function
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Wrong cookie, no access' });
        return;
    }
};

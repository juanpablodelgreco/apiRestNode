import { Jwt } from "../models/Jwt";
import { User } from "../models/UserModel";

export const validateJwt = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) next(new Error("Token is required"));

    const isValidJwt = new Jwt().verify(authorization);

    if (!isValidJwt) res.state(401).json("Invalid token");

    const user = await User.findOne({ id: isValidJwt.id, state: true });

    if (!user) res.state(401).json("Invalid token");

    req.user = user;

    next();
};

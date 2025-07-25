import { Request, Response, NextFunction } from "express"
import jwt  from "jsonwebtoken";
import { JWT_PASSWORD } from '../config/config';


export const userMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const header = req.headers["authorization"];
    const decodedData = jwt.verify(header as string, JWT_PASSWORD)

    if(decodedData){
        // @ts-ignore
        // TODO: How to overide the types of the express request object
        req.userId = decodedData.id,
        next();
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}
import {NextFunction, Request, Response} from 'express';
import Joi from 'joi';

export const validationMiddleware = (schema: any, property: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Joi.validate(req[property], schema).then((results) => {
            next();
        }).catch((err) => {
            const {details} = err;
            res.status(422).json({error: details[0].message});
        });
    }
};
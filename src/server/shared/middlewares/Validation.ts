import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InferType, ValidationError } from "yup";

type TField = "body" | "query" | "params" | "header";
type TAllSchemas = Record<TField, InferType<any>>;

export const validation = (schemas: Partial<TAllSchemas>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const allErrors: Record<string, Record<string, string>> = {};
    await Promise.all(
      Object.keys(schemas).map(async (schemasKeys) => {          
        try {
          await schemas[schemasKeys as TField].validate( req[schemasKeys as TField], { abortEarly: false });

          if (schemasKeys === 'params') {
            const checkNumber: number = Number (Object.values(req[schemasKeys as TField])[0] as any )
            if (isNaN(checkNumber)) {
              allErrors[schemasKeys as TField] = { [schemasKeys]: `id must be a number type, but the final value was: NaN (cast from the value ${Object.values(req[schemasKeys as TField])[0]} )`};
            }
            else if (checkNumber <= 0) {
              allErrors[schemasKeys as TField] = { [schemasKeys]: 'id must be greater than 0'};
            }
          }


        } catch (err) {
          const yupError = err as ValidationError;
          const validationErrors: Record<string, string> = {};
          yupError.inner.map((error) => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
          });
          allErrors[schemasKeys as TField] = validationErrors;
        }
      })  
    );
    if (Object.keys(allErrors).length === 0) {
      return next()
    }
    else {
      return res.status(StatusCodes.BAD_REQUEST).json({errors: allErrors})
    }
  };
};

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InferType, ValidationError } from "yup";


export const validation = (schema: InferType<any>, field: "body" | "query" | "params" | "header") => {
  

  return ( async (req: Request, res: Response, next: NextFunction) => {

  try {

    let validatedData = await schema.validate(req[field], { abortEarly: false });
    return next()

  } catch (err) {
    
    const yupError = err as ValidationError;
    // inicia um objeto vazio com keys e values em formato de string
    const validationErrors: Record<string, string> = {}; 
    
    yupError.inner.map((error) => {  
    
      if (!error.path) return;
      validationErrors[error.path] = error.message;
    
    })

    return res.status(StatusCodes.BAD_REQUEST).json({ validationErrors })
  }

  })
}

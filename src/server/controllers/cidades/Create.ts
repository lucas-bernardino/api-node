import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares/Validation";

const cidadeSchema = yup.object({
  nome: yup.string().defined().min(3),
  estado: yup.string().defined().min(3)
});

const filterSchema = yup.object({
  filter: yup.string().defined().min(3),
});

// O pacote yup permite verificar e validar os dados passados, facilitando o tratamento 
// de erros caso sejam passados dados incorretos.

interface ICidade extends yup.InferType<typeof cidadeSchema> {
  nome: string
  estado: string
}

interface IFilter extends yup.InferType<typeof cidadeSchema> {
  filter?: string
}


export const createBodyValidation = validation(cidadeSchema, "body")
export const createFilterValidation = validation(filterSchema, "query")


export const create = async (req: Request<{}, {}, ICidade>, res: Response) => { 

  console.log(req.body)

  return res.send("Create!");
}






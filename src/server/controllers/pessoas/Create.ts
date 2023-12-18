import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";

const cidadeSchema = yup.object({
  nome: yup.string().required().min(3).max(100),
  email: yup.string().required().min(3).email(),
  cidadeId: yup.number().integer().required().min(1)
});

// Omitindo o id do ICidade pois no models ele é obrigatório mas no post do create não
interface IBodyProps extends yup.InferType<typeof cidadeSchema>, Omit<IPessoa, 'id'> {
  nome: string;
  email: string;
  cidadeId: number;
}

export const createValidation = validation({
  body: cidadeSchema,
});

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await PessoasProvider.create(req.body)
  
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: result.message});
  }

  return res.status(StatusCodes.CREATED).json(result);
};

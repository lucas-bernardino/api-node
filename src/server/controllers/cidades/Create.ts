import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";

const cidadeSchema = yup.object({
  nome: yup.string().required().min(3).max(100),
});

// Omitindo o id do ICidade pois no models ele é obrigatório mas no post do create não
interface IBodyProps extends yup.InferType<typeof cidadeSchema>, Omit<ICidade, 'id'> {
  nome: string;
}

export const createValidation = validation({
  body: cidadeSchema,
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  const result = await CidadesProvider.create(req.body)
  
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: result.message});
  }

  return res.status(StatusCodes.CREATED).json(result);
};

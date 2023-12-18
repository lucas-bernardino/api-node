import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";

import { ParamsDictionary } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";

const paramsPropsSchema = yup.object({
  id: yup.string().required()
});

const bodyPropsSchema = yup.object({
  nome: yup.string().required().min(3),
  email: yup.string().required().min(3).email(),
  cidadeId: yup.number().required().min(1),
});

interface IParamProps extends yup.InferType<typeof paramsPropsSchema>, ParamsDictionary{
  id: string,
}

interface IBodyProps extends yup.InferType<typeof bodyPropsSchema>, Omit<IPessoa, 'id'> {
  nome: string,
  email: string,
  cidadeId: number
}

export const updateByIdValidation = validation({
  params: paramsPropsSchema,
  body: bodyPropsSchema,
});

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  
  const result = await PessoasProvider.updateById(Number(req.params.id), req.body)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: result.message});
  }

  return res.status(StatusCodes.OK).json();
};


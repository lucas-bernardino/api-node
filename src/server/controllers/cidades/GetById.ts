import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";

import { ParamsDictionary } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import { CidadesProvider } from "../../database/providers/cidades";

const paramsPropsSchema = yup.object({
  id: yup.string().required()
});

interface IParamProps extends yup.InferType<typeof paramsPropsSchema>, ParamsDictionary {
  id: string,
}

export const getByIdValidation = validation({
  params: paramsPropsSchema,
});

export const getById = async (req: Request<IParamProps>, res: Response) => {
  
  const result = await CidadesProvider.getById(Number(req.params.id))


  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: result.message})
  }

  return res.status(StatusCodes.OK).json(result)

};


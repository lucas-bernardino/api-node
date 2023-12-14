import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";

import { ParamsDictionary } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";

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
  console.log(req.params);

  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    nome: 'joinville'
  })
};


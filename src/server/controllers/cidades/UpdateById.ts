import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";

import { ParamsDictionary } from "express-serve-static-core";

const paramsPropsSchema = yup.object({
  id: yup.string().required()
});

const bodyPropsSchema = yup.object({
  nome: yup.string().required().min(3)
});

interface IParamProps extends yup.InferType<typeof paramsPropsSchema>, ParamsDictionary {
  id: string,
}

interface IBodyProps extends yup.InferType<typeof bodyPropsSchema> {
  nome: string,
}

export const updateByIdValidation = validation({
  params: paramsPropsSchema,
  body: bodyPropsSchema,
});

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  console.log(req.params);
  console.log(req.body);

  return res.send("updateById!");
};


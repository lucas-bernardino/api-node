import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";

import { ParamsDictionary } from "express-serve-static-core";

const paramsPropsSchema = yup.object({
  id: yup.string().required()
});

interface IParamProps extends yup.InferType<typeof paramsPropsSchema>, ParamsDictionary {
  id: string,
}

export const deleteByIdValidation = validation({
  params: paramsPropsSchema,
});

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params);

  return res.send("DeleteByID!");
};



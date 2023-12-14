import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";

const cidadeSchema = yup.object({
  nome: yup.string().required().min(3),
});

interface ICidade extends yup.InferType<typeof cidadeSchema> {
  nome: string;
}

export const createValidation = validation({
  body: cidadeSchema,
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);


  return res.status(StatusCodes.CREATED).json(1);
};

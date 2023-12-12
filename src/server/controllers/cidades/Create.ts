import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";

const cidadeSchema = yup.object({
  nome: yup.string().defined().min(3),
  estado: yup.string().defined().min(3),
});

const filterSchema = yup.object({
  filter: yup.string().defined().min(3),
});

interface ICidade extends yup.InferType<typeof cidadeSchema> {
  nome: string;
  estado: string;
}

interface IFilter extends yup.InferType<typeof cidadeSchema> {
  filter?: string;
}

export const createValidation = validation({
  body: cidadeSchema,
  query: filterSchema,
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);
  return res.send("Create!");
};

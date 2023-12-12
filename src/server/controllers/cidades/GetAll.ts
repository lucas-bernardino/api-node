import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";

const queryPropsSchema = yup.object({
  page: yup.number().notRequired().moreThan(0),
  limit: yup.number().notRequired().moreThan(0),
  filter: yup.string().notRequired()
});

interface IQueryProps extends yup.InferType<typeof queryPropsSchema> {
  page?: number,
  limit?: number,
  filter?: string
}

export const getAllValidation = validation({
  query: queryPropsSchema,
});

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  console.log(req.query);


  return res.send("GetAll!");
};

import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";

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

  res.setHeader('access-control-expose-headers', 'x-total-count'); //precisa dar o expose para tornar visivel
  res.setHeader('x-total-count', 1);

  return res.status(StatusCodes.OK).json([{ //precisa ser um array para fingir que são varios dados, assim como serão no futuro
    id: '1',
    nome: 'joinville', 
    }]);
};

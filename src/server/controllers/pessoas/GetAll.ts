import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";
import { PessoasProvider } from "../../database/providers/pessoas";

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
  
  const result = await PessoasProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '');
  
  const count = await PessoasProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: result.message})
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: count.message}) 
  }


  res.setHeader('access-control-expose-headers', 'x-total-count'); //precisa dar o expose para tornar visivel
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result)
};

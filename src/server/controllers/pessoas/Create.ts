import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from '../../database/models/Pessoa'
import * as yup from 'yup';

const pessoaSchema = yup.object({
  nome: yup.string().required().min(3).max(100),
  email: yup.string().required().min(3).max(100),
  cidadeId: yup.number().required().integer()
})

interface IBodyProps extends yup.InferType<typeof pessoaSchema>, Omit<IPessoa, 'id'> {
  nome: string,
  email: string,
  cidadeId: number
}



export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {
  
  

  return res.status(StatusCodes.OK).json();

}

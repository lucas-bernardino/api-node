import { Request, Response } from "express";
import * as yup from 'yup';
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from '../../database/providers/usuarios'
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";

const usuarioSchema = yup.object({
    email: yup.string().email().required().min(7).max(100),
    senha: yup.string().required().min(5).max(100),
    nome: yup.string().required().min(3).max(100)
})

interface IBodyProps extends yup.InferType<typeof usuarioSchema>, Omit<IUsuario, 'id'> {
    email: string,
    senha: string,
    nome: string
}

export const signUpValidation = validation ({
    body: usuarioSchema
});

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await UsuariosProvider.create(req.body)

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: result.message})
    }

    return res.status(StatusCodes.CREATED).json(result)
}
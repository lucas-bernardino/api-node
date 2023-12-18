import { Request, Response } from "express";
import * as yup from 'yup';
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from '../../database/providers/usuarios'
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";
import { PasswordCrypto } from "../../shared/services";

const usuarioSchema = yup.object({
    email: yup.string().email().required().min(7).max(100),
    senha: yup.string().required().min(5).max(100),
})

interface IBodyProps extends yup.InferType<typeof usuarioSchema>, Omit<IUsuario, 'id' | 'nome'> {
    email: string,
    senha: string,
}

export const signInValidation = validation ({
    body: usuarioSchema
});

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {




    const { email, senha } = req.body;


    const user = await UsuariosProvider.getByEmail(email)

    if (user instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({error: 'Email ou senha invalidos'})
    }

    const checkPassword = await PasswordCrypto.verifyPassword(senha, user.senha)
    // se o email não existir no DB ou se a senha for diferente dessa conta
    if (!checkPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({error: 'Email ou senha invalidos'})
    }

    return res.status(StatusCodes.OK).json( { accessToken: 'teste.teste.teste' } )
}
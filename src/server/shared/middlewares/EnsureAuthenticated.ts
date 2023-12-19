import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";

// ao invés de declarar o tipo de res, req e next, é possivel usar esse RequestHandler que automaticamente
// já infere esses tipos.

//essa funcao valida se o usuario está autenticado 
export const ensureAuthenticated: RequestHandler = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: 'Usuario não autenticado'
        })
    }

    //vamos utilizar o Bearer token, que é do formato: Bearer resto.do.token. Assim,
    //precisamos ver se existe o Bearer antes do espaço para ver se é o tipo de token correto.

    const [typeToken, token] = authorization.split(' ') // separa o token no espaço

    if (typeToken !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: 'Usuario nao autenticado'
        })
    }

    const jwtData = JWTService.verify(token); // verifica se o token é valido 
    if (jwtData === 'JWT_SECRET NAO ENCONTRADO') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Ocorreu um erro ao verificar o token do usuario'
        })
    }

    if (jwtData === 'TOKEN INVALIDO') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: 'Usuario nao autenticado'
        })
    }

    req.headers.idUsuario = jwtData.uid.toString(); // conseguiu resgatar o id do usuario, agora deixa o id disponivel para qualquer lugar caso quiser usar 

    return next() // return next() para seguir adiante com os outros middlewares do router (deu tudo certo)
} 
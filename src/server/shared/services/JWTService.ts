import * as jwt from 'jsonwebtoken';


interface IJwtData {
    uid: number, // id do usuario
}

type TSign = IJwtData | 'JWT_SECRET NAO ENCONTRADO' | 'TOKEN INVALIDO'



const sign = (data: IJwtData): string => {

    if (!process.env.JWT_SECRET) {
        return 'JWT_SECRET NAO ENCONTRADO'
    }

    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '24h' // deve fazer o login a cada 24h
    }); // segundo parametro é a hash, que deve ser privada
}

const verify = (token: string): TSign => {

    if (!process.env.JWT_SECRET) {
        return 'JWT_SECRET NAO ENCONTRADO'
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof decoded === 'string') {
            return 'TOKEN INVALIDO' 
        }
        return decoded as IJwtData
    } catch (error) {
        return 'TOKEN INVALIDO'
    }


}

export const JWTService = {
    sign,
    verify
}
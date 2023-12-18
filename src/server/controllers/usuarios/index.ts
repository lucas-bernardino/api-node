import * as signIn from './SignIn';
import * as signUp from './SignUp';


export const UsuariosController = {
  //Usando o spread para poder usar todas as acoes de cada método
  ...signIn, 
  ...signUp,
}



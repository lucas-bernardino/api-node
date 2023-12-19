import { Router } from 'express';
import { CidadesController, PessoasController, UsuariosController } from './../controllers/index';
import { ensureAuthenticated } from '../shared/middlewares/EnsureAuthenticated'
const router = Router();

router.get('/', (_, res) => {
  return res.send('RETORNO INICIAL');
});

// bodyValidator é um middleware responsável por validar os dados enviados no /teste.
// Apos a validação, ele chama o create
router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);

router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);

router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);

router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);

router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);




router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);

router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);

router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);

router.post('/pessoas', ensureAuthenticated, PessoasController.createValidation, PessoasController.create);

router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);




router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn)

router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp)





export { router };

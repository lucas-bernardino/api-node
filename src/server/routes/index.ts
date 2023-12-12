import { Router } from 'express';
import { CidadesController } from './../controllers/index';

const router = Router();

router.get('/', (_, res) => {
  return res.send('RETORNO INICIAL');
})

// bodyValidator é um middleware responsável por validar os dados enviados no /teste.
// Apos a validação, ele chama o create
router.post('/cidades', CidadesController.createValidation, CidadesController.create)

export { router };

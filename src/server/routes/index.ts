import { Router } from 'express';
import { CidadesController } from './../controllers/index';

const router = Router();

router.get('/', (_, res) => {
  return res.send('RETORNO INICIAL');
});

// bodyValidator é um middleware responsável por validar os dados enviados no /teste.
// Apos a validação, ele chama o create
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);

router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);

router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);

router.post('/cidades', CidadesController.createValidation, CidadesController.create);

router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);




router.get('/pessoas')

router.get('/pessoas/:id')

router.put('/pessoas/:id')

router.post('/pessoas')

router.delete('/pessoas/:id')

export { router };

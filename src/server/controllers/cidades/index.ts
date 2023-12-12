import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';

export const CidadesController = {
  //Usando o spread para poder usar todas as acoes de cada método
  ...create, 
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
}



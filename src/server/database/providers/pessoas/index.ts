import * as create from './Create';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as count from './Count'

// usa o spread para agrupar tudo e exportar tudo junto
export const PessoasProvider = {
  ...create,
  ...deleteById,
  ...updateById,
  ...getAll,
  ...getById,
  ...count
}

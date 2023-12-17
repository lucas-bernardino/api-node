import { server } from './server/Server'
import { Knex } from './server/database/knex';


const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log('App rodando!');
  })
}


// Se estiver em modo de produção, roda a migration/seed somente quando dá o deploy
// Se estiver rodando no localhost, não precisa dar dando migration/seed cada vez
if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate.latest()
    .then(() => {
      Knex.seed.run().then(() => {
        startServer()
      }).catch((err) => console.log(err))
    })
    .catch((err) => {console.log(err)})
} else {
  startServer();
}
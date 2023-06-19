import { Sequelize } from 'sequelize';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'F:\\react\\app\\app.sqlite',
  logging: console.log,
});
db.authenticate()
  // eslint-disable-next-line promise/always-return
  .then((value) => {
    console.log('=====================');
    console.log(value);
  })
  .catch((err) => {
    console.log(err);
  });
export default db;

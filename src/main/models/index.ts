import db from './db';
import Plug from './plug';
import User from './user';
import Setting from './setting';
import UserData from './user_data';
import UserPlug from './user_plug';

// db.sync({ force: true }).then(() => {
//   User.hasMany(UserPlug);
//   UserPlug.belongsTo(Plug);
// });

export { db, User, Plug, Setting, UserPlug, UserData };

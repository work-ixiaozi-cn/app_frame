import { DataTypes } from 'sequelize';
import db from './db';

const UserPlug = db.define(
  'UserPlug',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    plug_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default UserPlug;

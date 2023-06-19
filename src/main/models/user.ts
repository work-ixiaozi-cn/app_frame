import { DataTypes } from 'sequelize';
import db from './db';

const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default User;

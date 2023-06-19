import { DataTypes } from 'sequelize';
import db from './db';

const Setting = db.define(
  'Setting',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
    },
    key: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default Setting;

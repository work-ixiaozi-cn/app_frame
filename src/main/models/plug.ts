import { DataTypes } from 'sequelize';
import db from './db';

const Plug = db.define(
  'Plug',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: '',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    description: {
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

export default Plug;

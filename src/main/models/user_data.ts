import { DataTypes } from 'sequelize';
import db from './db';

const UserData = db.define(
  'UserData',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    plugId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      get() {
        let value = this.getDataValue('value');
        try {
          value = JSON.parse(value);
        } catch (e) {
          /* empty */
        }
        return value;
      },
      set(value) {
        this.setDataValue(
          'value',
          typeof value === 'string' ? value : JSON.stringify(value)
        );
      },
    },
  },
  {
    deletedAt: true,
    timestamps: true,
    underscored: true,
  }
);

export default UserData;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
});

Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks',
});

export default Task;

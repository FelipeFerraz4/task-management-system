// Importing necessary modules from Sequelize and other dependencies.
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Database configuration.
import User from './User.js'; // User model for establishing relationships.

// Defining the Task model, representing tasks in the database.
const Task = sequelize.define('Task', {
    // Unique identifier for each task, generated as a UUID.
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID v4.
        primaryKey: true, // Marks this field as the primary key.
    },
    // Title of the task.
    title: {
        type: DataTypes.STRING, // String type for short text.
        allowNull: false, // Title is required.
    },
    // Optional description providing more details about the task.
    description: {
        type: DataTypes.TEXT, // Text type for longer strings.
        allowNull: true, // Field is optional.
    },
    // Status of the task, restricted to specific predefined values.
    status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'), // Enum for task status.
        allowNull: false, // Status is required.
        defaultValue: 'pending', // Default status is 'pending'.
    },
    // Optional due date for the task.
    dueDate: {
        type: DataTypes.DATE, // Date type for deadlines.
        allowNull: true, // Field is optional.
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields.
});

// Establishing a relationship: Each task belongs to a user.
Task.belongsTo(User, {
    foreignKey: 'userId', // Foreign key linking the task to the user.
    as: 'user', // Alias for the relationship.
});

// Establishing a reverse relationship: A user can have multiple tasks.
User.hasMany(Task, {
    foreignKey: 'userId', // Foreign key linking tasks to the user.
    as: 'tasks', // Alias for the relationship.
});

// Exporting the Task model for use in other parts of the application.
export default Task;

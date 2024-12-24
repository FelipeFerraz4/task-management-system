// Importing necessary modules from Sequelize and other dependencies.
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'; // Library for hashing passwords.
import sequelize from '../config/database.js'; // Database configuration.

// Defining the User model, representing users in the database.
const User = sequelize.define('User', {
    // Unique identifier for each user, generated as a UUID.
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID v4.
        primaryKey: true, // Marks this field as the primary key.
    },
    // Name of the user.
    name: {
        type: DataTypes.STRING, // String type for names.
        allowNull: false, // Name is required.
        validate: {
            len: [3, 100], // Name must be between 3 and 100 characters.
        },
    },
    // Email address of the user, must be unique and valid.
    email: {
        type: DataTypes.STRING, // String type for emails.
        allowNull: false, // Email is required.
        unique: true, // Each email must be unique.
        validate: {
            isEmail: true, // Ensures the value is a valid email.
        },
    },
    // Hashed password for authentication.
    password: {
        type: DataTypes.STRING, // String type for passwords.
        allowNull: false, // Password is required.
    },
    // Role of the user, restricted to specific predefined values.
    role: {
        type: DataTypes.ENUM('admin', 'employee', 'manager'), // Enum for user roles.
        allowNull: false, // Role is required.
        defaultValue: 'employee', // Default role is 'employee'.
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields.
});

// Hook: Before creating a user, hash the password if it exists.
User.beforeCreate(async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing.
        const hashedPassword = await bcrypt.hash(user.password, salt); // Hash the password.
        user.password = hashedPassword; // Replace the plain password with the hashed version.
    }
});

// Instance method: Validates a plain-text password against the hashed password.
User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password); // Returns true if the passwords match.
};

// Exporting the User model for use in other parts of the application.
export default User;

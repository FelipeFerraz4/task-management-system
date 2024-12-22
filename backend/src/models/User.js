import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'employee',
    },
}, {
    timestamps: true,
});

export default User;
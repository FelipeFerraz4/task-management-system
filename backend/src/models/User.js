import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'employee', 'manager'),
        allowNull: false,
        defaultValue: 'employee',
    },
}, {
    timestamps: true,
});

User.beforeCreate(async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        // console.log('Password to be hashed:', user.password);  // Senha original
        // console.log('Hashed password:', hashedPassword); // Senha após hash
        user.password = hashedPassword;
    }
});


User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export default User;

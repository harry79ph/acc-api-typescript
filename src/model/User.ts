import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize("accordion-db", "firstname", "email", {
    dialect: "sqlite",
    host: "./users.sqlite"
});

sequelize.sync()
.then(() => console.log("db connection established"));

class User extends Model {}

User.init({
    firstname: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    day: {
        type: DataTypes.NUMBER
    },
    month: {
        type: DataTypes.NUMBER
    },
    year: {
        type: DataTypes.NUMBER
    },
    finalcomments: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "user",
    timestamps: false
});

module.exports = User;
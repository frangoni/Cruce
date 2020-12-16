const { Model, DataTypes } = require("sequelize");
const db = require("../db");
const { hash, genSalt } = require("bcrypt");

class User extends Model {
  hashPassword(password) {
    return hash(password, this.salt);
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        notEmpty: true,
      },
    },
    salt: {
      type: DataTypes.STRING,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rejected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  return genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return hash(user.password, user.salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

User.prototype.hash = function (password) {
  return hash(password, this.salt);
};

module.exports = User;

'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: 'userId' })
    }

    comparePassword(tryPassword, cb) {
      console.log("THIS RUNS");
      console.log(this, "THIS");
      bcrypt.compare(tryPassword, this.dataValues.password, cb)
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This email is already taken'
      },
      validate: {
        notNull: {
          msg: 'An email is required'
        },
        isEmail: {
          msg: 'Please provide an email address'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue('password')
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(async (user, options) => {
    console.log(user, "USER");
    console.log(user.changed('password'), "USER CHANGED PASSWORD");
    console.log(user.password(), "USER.PASSWORD");
    console.log();
    if (!user.changed('password')) return
    try {
      const hash = await bcrypt.hash(user.dataValues.password, SALT_ROUNDS)
      console.log(hash, "HASH");
      user.password = hash
    } catch (error) {
      console.error(error);
    }
  })

  return User;
};
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Lidhja me databazën

const Sponsor = sequelize.define('Sponsor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  website: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Sponsor;

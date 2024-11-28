// models/post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user'); // Shtoni lidhjen me modelin e përdoruesit nëse është e nevojshme


const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  performance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true, // Aktivizoni menaxhimin e `createdAt` dhe `updatedAt`
});

// Nëse postet janë të lidhura me një përdorues, mund të shtoni një lidhje
Post.belongsTo(User, { foreignKey: 'userId' });



module.exports = Post;

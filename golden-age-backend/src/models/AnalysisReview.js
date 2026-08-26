const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AnalysisReview = sequelize.define('AnalysisReview', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: true // Optional if guest
  },
  communityId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  stepsCompleted: {
    type: DataTypes.JSON, // ['overview', 'community', 'pricing', 'care']
    defaultValue: []
  },
  isFinished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = AnalysisReview;

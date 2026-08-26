const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceRequest = sequelize.define('ServiceRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  serviceId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serviceTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subtype: {
    type: DataTypes.STRING,
    allowNull: false
  },
  needDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  startTimeRange: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bookingHours: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactMode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preferredContactTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
    defaultValue: 'Pending'
  }
});

module.exports = ServiceRequest;

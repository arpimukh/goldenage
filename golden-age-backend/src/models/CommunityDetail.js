const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CommunityDetail = sequelize.define('CommunityDetail', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  communityId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  // Pricing Details
  rentRange: DataTypes.STRING,
  communityFee: DataTypes.STRING,
  pricingModel: DataTypes.STRING,
  
  // Care Details
  memoryCareLevel: DataTypes.STRING,
  medicationManagement: DataTypes.BOOLEAN,
  mobilityAssistance: DataTypes.STRING,
  behavioralCare: DataTypes.BOOLEAN,
  respiteAvailable: DataTypes.BOOLEAN,
  
  // Payment Options
  medicaidAccepted: DataTypes.BOOLEAN,
  vaBenefits: DataTypes.BOOLEAN,
  insuranceAccepted: DataTypes.BOOLEAN,
  privatePayOnly: DataTypes.BOOLEAN,
  
  // Availability
  totalUnits: DataTypes.INTEGER,
  availableUnits: DataTypes.INTEGER,
  waitlistStatus: DataTypes.STRING,
  earliestMoveIn: DataTypes.STRING,
  
  // Community Info
  yearOpened: DataTypes.STRING,
  ownership: DataTypes.STRING,
  
  // Amenities (JSON arrays)
  services: DataTypes.JSON,
  dining: DataTypes.JSON,
  wellness: DataTypes.JSON,
  social: DataTypes.JSON
});

module.exports = CommunityDetail;

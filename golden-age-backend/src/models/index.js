const Provider = require('./Provider');
const Community = require('./Community');
const Booking = require('./Booking');
const ServiceRequest = require('./ServiceRequest');
const CommunityDetail = require('./CommunityDetail');

// Define Relationships
Provider.hasMany(Community, { foreignKey: 'providerId' });
Community.belongsTo(Provider, { foreignKey: 'providerId' });

Community.hasOne(CommunityDetail, { foreignKey: 'communityId' });
CommunityDetail.belongsTo(Community, { foreignKey: 'communityId' });

Community.hasMany(Booking, { foreignKey: 'communityId' });
Booking.belongsTo(Community, { foreignKey: 'communityId' });

module.exports = {
  Provider,
  Community,
  CommunityDetail,
  Booking,
  ServiceRequest
};

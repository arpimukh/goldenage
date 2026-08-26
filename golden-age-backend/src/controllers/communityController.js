const { Community, CommunityDetail, Booking, ServiceRequest } = require('../models');
const { Op } = require('sequelize');

exports.getListings = async (req, res) => {
  try {
    const { city, type } = req.query;
    const where = {};
    if (city && city !== 'All') where.city = city;
    if (type && type !== 'All') where.type = type;

    const listings = await Community.findAll({ 
      where,
      include: [{ model: CommunityDetail }]
    });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ message: 'Booking request received', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

exports.createServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.create(req.body);
    res.status(201).json({ message: 'Service request registered', serviceRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service request', error: error.message });
  }
};

exports.seedData = async (req, res) => {
  try {
    const count = await Community.count();
    if (count > 0) return res.json({ message: 'Data already exists' });

    const listings = [
      { registrationID: "GO-001", name: "Golden Oaks Community", city: "Bangalore", type: "Community Living", price: 45000, image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80", tags: ["Medical Care", "Shared Dining"] },
      { registrationID: "AP-002", name: "Azure Palms Independent", city: "Goa", type: "Independent Living", price: 65000, image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80", tags: ["Beach Access", "Private Garden"] },
      { registrationID: "SL-003", name: "Silver Linings Hub", city: "Bangalore", type: "Independent Living", price: 38000, image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80", tags: ["Yoga Studio", "24/7 Security"] },
      { registrationID: "SS-004", name: "Seaside Serenity Villas", city: "Goa", type: "Community Living", price: 72000, image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80", tags: ["Pet Friendly", "Pool"] },
    ];

    await Community.bulkCreate(listings);
    res.json({ message: 'Mock data seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding data', error: error.message });
  }
};

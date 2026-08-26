const { Provider } = require('../models');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const signupSchema = z.object({
  businessName: z.string().min(1),
  facilityTypes: z.array(z.string()).min(1),
  portfolioSize: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  workEmail: z.string().email(),
  phone: z.string().min(1),
  jobTitle: z.string().min(1),
  password: z.string().min(8)
});

exports.registerProvider = async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    
    const existingProvider = await Provider.findOne({ where: { workEmail: validatedData.workEmail } });
    if (existingProvider) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const provider = await Provider.create(validatedData);
    
    // In production, send verification email here

    res.status(201).json({ 
      message: 'Provider registered successfully. Pending approval.',
      providerId: provider.id 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.loginProvider = async (req, res) => {
  try {
    const { workEmail, password } = req.body;
    
    const provider = await Provider.findOne({ where: { workEmail } });
    if (!provider || !(await provider.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: provider.id }, 
      process.env.JWT_SECRET || 'your_super_secret_jwt_key_here',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      provider: {
        id: provider.id,
        businessName: provider.businessName,
        firstName: provider.firstName,
        lastName: provider.lastName,
        workEmail: provider.workEmail
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

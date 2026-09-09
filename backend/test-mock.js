require('dotenv').config();
const mongoose = require('mongoose');
const Package = require('./models/Package');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const pkg = await Package.findOne();
  
  // mock request body
  const reqBody = {
    name: pkg.name,
    inclusions: '["A", "B"]',
    termsAndConditions: 'New T&C'
  };

  const parsedInclusions = reqBody.inclusions ? JSON.parse(reqBody.inclusions) : pkg.inclusions;
  
  pkg.inclusions = parsedInclusions;
  pkg.termsAndConditions = reqBody.termsAndConditions !== undefined ? reqBody.termsAndConditions : pkg.termsAndConditions;
  
  await pkg.save();
  const updated = await Package.findById(pkg._id);
  console.log('Updated via mock logic:', updated.inclusions, updated.termsAndConditions);

  process.exit(0);
}
run();

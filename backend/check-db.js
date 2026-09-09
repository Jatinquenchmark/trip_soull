require('dotenv').config();
const mongoose = require('mongoose');
const Package = require('./models/Package');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const pkgs = await Package.find();
  console.log(JSON.stringify(pkgs.map(p => ({
    name: p.name,
    inclusions: p.inclusions,
    exclusions: p.exclusions,
    termsAndConditions: p.termsAndConditions
  })), null, 2));
  process.exit(0);
}).catch(console.error);

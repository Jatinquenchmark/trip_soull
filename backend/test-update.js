require('dotenv').config();
const mongoose = require('mongoose');
const Package = require('./models/Package');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const pkg = await Package.findOne();
    if (pkg) {
      console.log('Original pkg:', pkg.name, pkg.inclusions, pkg.termsAndConditions);
      pkg.inclusions = ['Test Inclusion'];
      pkg.termsAndConditions = 'Test T&C';
      await pkg.save();
      const updated = await Package.findById(pkg._id);
      console.log('Updated pkg:', updated.name, updated.inclusions, updated.termsAndConditions);
      
      // reset
      pkg.inclusions = [];
      pkg.termsAndConditions = '';
      await pkg.save();
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
});

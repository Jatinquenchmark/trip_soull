const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  overview: { type: String, default: '' },
  pricingTiers: {
    essential: { type: String, default: '' },
    comfort: { type: String, default: '' },
    luxury: { type: String, default: '' }
  },
  itinerary: [{
    day: { type: Number },
    title: { type: String },
    description: { type: String }
  }]
}, { _id: false });

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  countryId: { type: String, required: true },
  category: { type: String },
  price: { type: String },
  discountedPrice: { type: String },
  overview: { type: String },
  groupCapacity: { type: String, default: 'Customizable' },
  pricingTiers: {
    essential: { type: String },
    comfort: { type: String },
    luxury: { type: String }
  },
  days: { type: Number },
  nights: { type: Number },
  rating: { type: Number, default: 5.0 },
  images: [{ type: String }], // Array of image URLs (Cloudinary)
  itinerary: [{
    day: { type: Number },
    title: { type: String },
    description: { type: String }
  }],
  inclusions: {
    flights: { type: Boolean, default: false },
    hotels: { type: Boolean, default: false },
    breakfast: { type: Boolean, default: false },
    transfers: { type: Boolean, default: false }
  },
  exclusions: [{ type: String }],
  experiences: {
    solo: { type: experienceSchema, default: () => ({}) },
    adventure: { type: experienceSchema, default: () => ({}) },
    couple: { type: experienceSchema, default: () => ({}) }
  }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);

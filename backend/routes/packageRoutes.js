const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const Package = require('../models/Package');
const auth = require('../middleware/auth');

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage (no saving to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST: Create a new package
router.post('/', auth, upload.any(), async (req, res) => {
  try {
    let bannerUrl = '';
    const galleryUrls = [];
    const legacyUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'trip_soul' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        });

        if (file.fieldname === 'bannerImage') {
          bannerUrl = result.secure_url;
        } else if (file.fieldname === 'galleryImages') {
          galleryUrls.push(result.secure_url);
        } else {
          legacyUrls.push(result.secure_url);
        }
      }
    }

    let finalImages = [];
    if (bannerUrl || req.body.existingBanner) {
      const finalBanner = bannerUrl || req.body.existingBanner;
      const finalGallery = [
        ...(req.body.existingGallery ? JSON.parse(req.body.existingGallery) : []),
        ...galleryUrls
      ];
      finalImages = [finalBanner, ...finalGallery];
    } else {
      const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
      finalImages = [...existingImages, ...legacyUrls, ...galleryUrls];
    }

    // Parse JSON fields from the form data if they are stringified
    const parsedItinerary = req.body.itinerary ? JSON.parse(req.body.itinerary) : [];
    const parsedInclusions = req.body.inclusions ? JSON.parse(req.body.inclusions) : [];
    const parsedExclusions = req.body.exclusions ? JSON.parse(req.body.exclusions) : [];
    const parsedPricingTiers = req.body.pricingTiers ? JSON.parse(req.body.pricingTiers) : {};
    const parsedExperiences = req.body.experiences 
      ? JSON.parse(req.body.experiences) 
      : { 
          solo: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
          adventure: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
          couple: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] }
        };

    const newPackage = new Package({
      name: req.body.name,
      countryId: req.body.countryId,
      category: req.body.category,
      price: req.body.price,
      discountedPrice: req.body.discountedPrice,
      days: req.body.days,
      nights: req.body.nights,
      overview: req.body.overview,
      groupCapacity: req.body.groupCapacity,
      pricingTiers: parsedPricingTiers,
      rating: req.body.rating || 5.0,
      images: finalImages,
      itinerary: parsedItinerary,
      inclusions: parsedInclusions,
      exclusions: parsedExclusions,
      experiences: parsedExperiences,
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ message: 'Failed to create package', error: error.message });
  }
});

// GET: Fetch all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Failed to fetch packages', error: error.message });
  }
});

// GET: Fetch a single package by ID
router.get('/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(pkg);
  } catch (error) {
    console.error('Error fetching package by ID:', error);
    res.status(500).json({ message: 'Failed to fetch package', error: error.message });
  }
});

// PUT: Update a package
router.put('/:id', auth, upload.any(), async (req, res) => {
  try {
    const existingPackage = await Package.findById(req.params.id);
    if (!existingPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    let bannerUrl = '';
    const galleryUrls = [];
    const legacyUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'trip_soul' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        });

        if (file.fieldname === 'bannerImage') {
          bannerUrl = result.secure_url;
        } else if (file.fieldname === 'galleryImages') {
          galleryUrls.push(result.secure_url);
        } else {
          legacyUrls.push(result.secure_url);
        }
      }
    }

    let finalImages = [];
    if (bannerUrl || req.body.existingBanner) {
      const finalBanner = bannerUrl || req.body.existingBanner;
      const finalGallery = [
        ...(req.body.existingGallery ? JSON.parse(req.body.existingGallery) : []),
        ...galleryUrls
      ];
      finalImages = [finalBanner, ...finalGallery];
    } else {
      const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : (existingPackage.images || []);
      finalImages = [...existingImages, ...legacyUrls, ...galleryUrls];
    }

    const parsedItinerary = req.body.itinerary ? JSON.parse(req.body.itinerary) : existingPackage.itinerary;
    const parsedInclusions = req.body.inclusions ? JSON.parse(req.body.inclusions) : existingPackage.inclusions;
    const parsedExclusions = req.body.exclusions ? JSON.parse(req.body.exclusions) : existingPackage.exclusions;
    const parsedPricingTiers = req.body.pricingTiers ? JSON.parse(req.body.pricingTiers) : existingPackage.pricingTiers;
    const parsedExperiences = req.body.experiences ? JSON.parse(req.body.experiences) : existingPackage.experiences;

    existingPackage.name = req.body.name || existingPackage.name;
    existingPackage.countryId = req.body.countryId || existingPackage.countryId;
    existingPackage.category = req.body.category || existingPackage.category;
    existingPackage.price = req.body.price || existingPackage.price;
    existingPackage.discountedPrice = req.body.discountedPrice !== undefined ? req.body.discountedPrice : existingPackage.discountedPrice;
    existingPackage.days = req.body.days || existingPackage.days;
    existingPackage.nights = req.body.nights || existingPackage.nights;
    existingPackage.overview = req.body.overview || existingPackage.overview;
    existingPackage.groupCapacity = req.body.groupCapacity || existingPackage.groupCapacity;
    existingPackage.pricingTiers = parsedPricingTiers;
    existingPackage.itinerary = parsedItinerary;
    existingPackage.inclusions = parsedInclusions;
    existingPackage.exclusions = parsedExclusions;
    existingPackage.images = finalImages;
    existingPackage.experiences = parsedExperiences;

    const updatedPackage = await existingPackage.save();
    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ message: 'Failed to update package', error: error.message });
  }
});

// DELETE: Delete a package
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ message: 'Failed to delete package', error: error.message });
  }
});

module.exports = router;

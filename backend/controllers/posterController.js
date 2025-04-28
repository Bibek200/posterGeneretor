import Poster from '../models/Poster.js';

export const uploadPoster = async (req, res) => {
  try {
    const { category, positions } = req.body;
    const adminId = req.user.id;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: 'Image file is required!' });
    }

    const imageUrl = `/uploads/${imageFile.filename}`;

    const newPoster = new Poster({
      category,
      imageUrl,
      positions: JSON.parse(positions),
      uploadedBy: adminId,
    });

    await newPoster.save();

    res.status(201).json({ message: 'Poster uploaded successfully!', poster: newPoster });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while uploading poster.' });
  }
};

// Get posters by category
export const getPostersByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    // Find posters matching the given category
    const posters = await Poster.find({ category });

    if (posters.length === 0) {
      return res.status(404).json({ message: 'No posters found for this category' });
    }

    res.status(200).json(posters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching posters by category' });
  }
};

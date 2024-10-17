const { get } = require("../routes/userRoutes");
const profileService = require("../services/profileService");

const createProfile = async (req, res, next) => {
  try {
    const { user_id, name, bio } = req.body;
    const profile_pic = req.file ? req.file.buffer : null; // Access the uploaded file buffer
    console.log(user_id, name, bio, profile_pic);
    const profile = await profileService.createProfile({
      user_id,
      name,
      bio,
      profile_pic,
    });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    const profile_pic = req.file ? req.file.buffer : null; // Access the uploaded file buffer
    console.log(id, name, bio, profile_pic);
    const profile = await profileService.updateProfile({
      id,
      name,
      bio,
      profile_pic,
    });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const updateProfilePic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { profile_pic } = req.body;
    console.log(id, profile_pic);
    const profile = await profileService.updateProfilePic({
      id,
      profile_pic,
    });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const updateBio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bio } = req.body;
    console.log(id, bio);
    const profile = await profileService.updateBio({ id, bio });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const updateName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log(id, name);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const fetchProfiles = async (req, res, next) => {
  try {
    const profiles = await profileService.getProfiles();
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

const getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await profileService.getProfileById(id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createProfile,
  updateProfile,
  updateProfilePic,
  updateBio,
  updateName,
  fetchProfiles,
  getProfileById,
};

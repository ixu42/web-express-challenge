const profileService = require("../services/profileService");

/* const createProfile = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const { name, bio } = req.body;
    const profile_pic = req.file ? req.file.buffer : null; // Access the uploaded file buffer
    console.log(id, name, bio, profile_pic);
    const profile = await profileService.createProfile({
      id,
      name,
      bio,
      profile_pic,
    });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
}; */

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const { name, bio } = req.body;
    const profile_pic = req.file ? req.file.buffer : null; // Access the uploaded file buffer
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
    const { id } = req.session.user;
    // const { profile_pic } = req.body;
    const profile_pic = req.file.buffer;
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
    const { id } = req.session.user;
    const { bio } = req.body;
    const profile = await profileService.updateBio({ id, bio });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const updateName = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const { name } = req.body;
    const profile = await profileService.updateName({ id, name });
    req.session.user.username = name;
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const getProfiles = async (req, res, next) => {
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

const getMyProfile = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const profile = await profileService.getProfileById(id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

const searchProfiles = async (req, res, next) => {
  try {
    const { name } = req.query;
    const profiles = await profileService.searchProfiles(name);
    res.json(profiles);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  updateProfile,
  updateProfilePic,
  updateBio,
  updateName,
  getProfiles,
  getProfileById,
  getMyProfile,
  searchProfiles,
};

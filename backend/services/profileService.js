const userModel = require("../models/profileModel");

const fs = require('fs');

// Read the default profile picture file
const defaultProfilePic = fs.readFileSync('./database/profile_pic.png');

// Convert it to a binary format
const defaultProfilePicBinary = Buffer.from(defaultProfilePic);

const createProfile = async ({ user_id, name, bio }) => {
  try {
    console.log("creating profile");
    console.log(user_id, name, bio, defaultProfilePicBinary);
    const profile = await userModel.createProfile(user_id, name, bio, defaultProfilePicBinary);
    const base64Image = profile.profile_pic ? profile.profile_pic.toString('base64') : null;
    profile.profile_pic = base64Image;
    console.log("creating profile successful:", profile);
    return profile;
  } catch (error) {
    console.log("error creating profile:", error.message);
    throw error;
  }
};

const updateProfile = async ({ id, name, bio, profile_pic }) => {
  try {
    console.log("updating profile");
    console.log(id, name, bio, profile_pic);
    const profile = await userModel.updateProfile(id, name, bio, profile_pic);
    const base64Image = profile.profile_pic ? profile.profile_pic.toString('base64') : null;
    profile.profile_pic = base64Image;
    console.log("updating profile successful:", profile);
    return profile;

  } catch (error) {
    console.log("error updating profile:", error.message);
    throw error;
  }
};

const updateProfilePic = async ({ id, profile_pic }) => {
  try {
    console.log("updating profile pic");
    console.log(id, profile_pic);
    const profile = await userModel.updateProfilePic(id, profile_pic);
    const base64Image = profile.profile_pic ? profile.profile_pic.toString('base64') : null;
    profile.profile_pic = base64Image;
    console.log("updating profile pic successful:", profile);
    return profile;
  } catch (error) {
    console.log("error updating profile pic:", error.message);
    throw error;
  }
};

const updateBio = async ({ id, bio }) => {
  try {
    console.log("updating bio");
    console.log(id, bio);
    const profile = await userModel.updateBio(id, bio);
    console.log("updating bio successful:", profile);
    return profile;
  } catch (error) {
    console.log("error updating bio:", error.message);
    throw error;
  }
};

const updateName = async ({ id, name }) => {
  try {
    console.log("updating name");
    console.log(id, name);
    const profile = await userModel.updateName(id, name);
    console.log("updating name successful:", profile);
    return profile;
  } catch (error) {
    console.log("error updating name:", error.message);
    throw error;
  }
};

const getProfileById = async (id) => {
  try {
    console.log("fetching profile");
    console.log(id);
    const profile = await userModel.getProfileById(id);
    const base64Image = profile.profile_pic ? profile.profile_pic.toString('base64') : null;
    profile.profile_pic = base64Image;
    console.log("fetching profile successful:", profile);
    return profile;
  } catch (error) {
    console.log("error fetching profile:", error.message);
    throw error;
  }
};

const getProfiles = async () => {
  try {
    console.log("fetching profiles");
    const profiles = await userModel.getProfiles();
    const base64Image = profile.profile_pic ? profile.profile_pic.toString('base64') : null;
    profile.profile_pic = base64Image;
    console.log("fetching profiles successful:", profiles);
    return profiles;
  } catch (error) {
    console.log("error fetching profiles:", error.message);
    throw error;
  }
};

const searchProfiles = async (name) => {
  try {
    console.log("searching profiles");
    console.log(name);
    const profiles = await userModel.searchProfiles(name);
    const base64Image = profile.profile_pic ? profile.profile_pic.toString('base64') : null;
    profile.profile_pic = base64Image;
    console.log("searching profiles successful:", profiles);
    return profiles;
  } catch (error) {
    console.log("error searching profiles:", error.message);
    throw error;
  }
}

module.exports = {
  createProfile,
  updateProfile,
  updateProfilePic,
  updateBio,
  updateName,
  getProfiles,
  getProfileById,
  searchProfiles,
};

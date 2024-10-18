const db = require("../database/db");
const { NotFoundError } = require("../errors/errorClass");

const createProfile = async (user_id, name, bio, profile_pic) => {
  const result = await db.query(
    "INSERT INTO profile (user_id, name, bio, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, name, bio, profile_pic]
  );
  return result.rows[0];
};

const updateProfile = async (id, name, bio, profile_pic) => {
  const result = await db.query(
    "UPDATE profile SET name = $1, bio = $2, profile_pic = $3, updated_at = NOW() WHERE id = $4 RETURNING *",
    [name, bio, profile_pic, id]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Profile not found");
  }
  return result.rows[0];
};

const updateProfilePic = async (id, profile_pic) => {
  const result = await db.query(
    "UPDATE profile SET profile_pic = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [profile_pic, id]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Profile not found");
  }
  return result.rows[0];
};

const updateBio = async (id, bio) => {
  const result = await db.query(
    "UPDATE profile SET bio = $1, updated_at = NOW() WHERE id = $2  RETURNING *",
    [bio, id]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Profile not found");
  }
  return result.rows[0];
};

const updateName = async (id, name) => {
  const result = await db.query(
    "UPDATE profile SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [name, id]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Profile not found");
  }
  return result.rows[0];
};

const getProfiles = async () => {
  const result = await db.query("SELECT * FROM profile");
  return result.rows;
};

const getProfileById = async (id) => {
  const result = await db.query("SELECT * FROM profile WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    throw new NotFoundError("Profile not found");
  }
  return result.rows[0];
};



module.exports = {
  createProfile,
  updateProfile,
  updateProfilePic,
  updateBio,
  updateName,
  getProfiles,
  getProfileById,
};

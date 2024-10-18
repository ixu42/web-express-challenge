const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const upload = require("../middlewares/uploadMiddleware");

// Route for fetching and storing Pokémon data
router.get("/", profileController.fetchProfiles);
router.get("/:id", profileController.getProfileById);
router.post(
  "/create",
  upload.single("profile_pic"),
  profileController.createProfile
);
router.put("/update/:id", profileController.updateProfile);
router.patch(
  "/update/:id/profile_pic",
  upload.single("profile_pic"),
  profileController.updateProfilePic
);
router.patch("/update/:id/bio", profileController.updateBio);
router.patch("/update/:id/name", profileController.updateName);

module.exports = router;

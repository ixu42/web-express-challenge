const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const upload = require("../middlewares/uploadMiddleware");
const { isAuthenticated } = require("../userController");

router.get("/search", isAuthenticated, profileController.searchProfiles);
router.get("/", isAuthenticated, profileController.getProfiles);
router.get("/me", isAuthenticated, profileController.getMyProfile);
router.get("/:id", isAuthenticated, profileController.getProfileById);
/* router.post(
  "/create",
  upload.single("profile_pic"),
  profileController.createProfile
); */
router.put("/me/update", isAuthenticated, profileController.updateProfile);
router.patch(
  "/me/update/profile_pic",
  upload.single("profile_pic"),
  profileController.updateProfilePic
);
router.patch("/me/update/bio", isAuthenticated, profileController.updateBio);
router.patch("/me/update/name", isAuthenticated, profileController.updateName);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/user", userController.getALoginUser);

router.get("/user/find/:id", userController.getAUser);

router.patch("/user/patch", userController.updateAUser);

router.post("/user/post", userController.postAUser);

router.delete("/user/delete", userController.deleteAUser);

router.patch("/user/update", userController.adminUpdateUser);

router.get("/users", userController.getAllUsers);

module.exports = router;

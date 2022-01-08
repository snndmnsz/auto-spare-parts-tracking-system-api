const express = require("express");
const router = express.Router();
const partController = require("../controllers/part");


router.get("/part/:id",partController.getAPart);

router.post("/part/post",partController.postAPart);

router.post("/part/post",partController.createAPart);

router.patch("/part/patch",partController.updateAPart);

router.delete("/part/delete",partController.deleteAPart);

router.get("/parts-for-car/:id",partController.getPartsForCar);

module.exports = router;
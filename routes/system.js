const express = require("express");
const router = express.Router();
const systemController = require("../controllers/system");

router.get("/parts", systemController.getAllParts);

router.get("/currency", systemController.getCurrency);

router.get("/brand/:id", systemController.getBrandById);

router.get("/storage/:barcode", systemController.getPartsInStoragebyID);

router.post("/storage/post", systemController.postAPartToStorage);

router.get("/car/:id", systemController.findCarById);

router.get("/payment-methods", systemController.getPaymentMethods);

router.get("/payments", systemController.getPayments);

router.post("/payment/post", systemController.createAPayment);

router.delete("/payment/delete", systemController.deleteAPayment);

router.get("/bills", systemController.getBills);

router.get("/invoice/:id", systemController.getInvoice);

router.post("/bill/post", systemController.createABill);

router.delete("/bill/delete", systemController.deleteABill);

router.get("/order-bill/:orderId", systemController.getCreateBillForOrder);

router.get("/messages", systemController.getMessages);

router.post("/messages/post", systemController.postAMessages);

router.delete("/messages/delete", systemController.deleteAMessages);


module.exports = router;

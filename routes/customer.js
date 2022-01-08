const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");

router.get("/customers", customerController.getAllCustomers);

router.get("/customer/:id", customerController.getCustomerById);

router.put("/customer/put", customerController.putNewCustomer);

router.patch("/customer/patch", customerController.updateACustomer);

router.delete("/customer/delete", customerController.deleteACustomer);

module.exports = router;

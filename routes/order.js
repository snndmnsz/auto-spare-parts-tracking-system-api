const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.post("/order/post",orderController.createAnOrder);

router.post("/storage/post/order-status",orderController.createOrderStatus);

router.post("/storage/post/parts-in-orders",orderController.postPartsInToOrder);

router.get("/active-orders",orderController.getActiveOrders);

router.get("/order-id",orderController.getAllOrderIds);

router.get("/order-find-parts/:id",orderController.findPartsInOrder);

router.post("/order/deliver",orderController.postDeliverOrder);

router.post("/order/cancel",orderController.postCancelOrder);

module.exports = router;
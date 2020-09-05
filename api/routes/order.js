const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({ "mess": " orders your" })
})

router.post("/", (req, res, next) => {
    const order = {
        productid: req.body.productid,
        quantity: req.body.quantity
    };
    res.status(201).json({
        mess: "Order Posted ",
        order: order
    })
})

router.get("/:orderID", (req, res, next) => {
    const orderid = req.params.orderid;
    res.status(200).json({
        "mess": "Order Details",
        "order id": orderid
    })
})


router.delete("/:orderID", (req, res, next) => {
    const orderid = req.params.orderid;
    res.status(200).json({
        "mess": "Order was deleted",
        "order id": orderid
    })
})
module.exports = router;
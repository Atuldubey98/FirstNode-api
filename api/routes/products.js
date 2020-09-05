const express = require("express");
const Product = require("./models/product");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http:localhost:5000/products/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
      console.log(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created Product Successfully",
        createdproduct: {
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: "http:localhost:5000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:productID", (req, res, next) => {
  const id = req.params.productID;
  Product.findById(id)
    .select("name price _id")
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: "Get All the products by the given link",
            url: "http://localhost:5000/products",
          },
        });
      } else {
        res.status(404).json({
          "status ": "No valid entry found for the given id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/:productID", (req, res, next) => {
  const updateOps = {};
  const id = req.params.productID;
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:productID", (req, res, next) => {
  Product.deleteOne({ _id: req.params.productID })
    .exec()
    .then((result) => {
      res.status(200).json({
        status: result,
        message: {
          type: "POST",
          body: {
            name: "Enter name",
            price: "Enter the Price",
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;

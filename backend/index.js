require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());


// ==========================================
// ADD / RESET HOLDINGS
// ==========================================

app.get("/addHoldings", async (req, res) => {
  try {
    const tempHoldings = [

      {
        name: "BHARTIARTL",
        qty: 2,
        avg: 538.05,
        price: 541.15,
        net: "+0.58%",
        day: "+2.99%",
        isLoss: false,
      },

      {
        name: "HDFCBANK",
        qty: 2,
        avg: 1383.40,
        price: 1522.35,
        net: "+10.04%",
        day: "+0.11%",
        isLoss: false,
      },

      {
        name: "HINDUNILVR",
        qty: 1,
        avg: 2335.85,
        price: 2417.40,
        net: "+3.49%",
        day: "+0.21%",
        isLoss: false,
      },

      {
        name: "INFY",
        qty: 1,
        avg: 1350.50,
        price: 1555.45,
        net: "+15.18%",
        day: "-1.60%",
        isLoss: true,
      },

      {
        name: "ITC",
        qty: 5,
        avg: 202.00,
        price: 207.90,
        net: "+2.92%",
        day: "+0.80%",
        isLoss: false,
      },

      {
        name: "KPITTECH",
        qty: 5,
        avg: 250.30,
        price: 266.45,
        net: "+6.45%",
        day: "+3.54%",
        isLoss: false,
      },

      {
        name: "M&M",
        qty: 2,
        avg: 809.90,
        price: 779.80,
        net: "-3.72%",
        day: "-0.01%",
        isLoss: true,
      },

      {
        name: "RELIANCE",
        qty: 1,
        avg: 2193.70,
        price: 2112.40,
        net: "-3.71%",
        day: "+1.44%",
        isLoss: true,
      },

      {
        name: "SBIN",
        qty: 4,
        avg: 324.35,
        price: 430.20,
        net: "+32.63%",
        day: "-0.34%",
        isLoss: true,
      },

      {
        name: "SGBMAY29",
        qty: 2,
        avg: 4727.00,
        price: 4719.00,
        net: "-0.17%",
        day: "+0.15%",
        isLoss: true,
      },

      {
        name: "TATAPOWER",
        qty: 5,
        avg: 104.20,
        price: 124.15,
        net: "+19.15%",
        day: "-0.24%",
        isLoss: true,
      },

      {
        name: "TCS",
        qty: 1,
        avg: 3041.70,
        price: 3194.80,
        net: "+5.03%",
        day: "-0.25%",
        isLoss: true,
      },

      {
        name: "WIPRO",
        qty: 4,
        avg: 489.30,
        price: 577.75,
        net: "+18.08%",
        day: "+0.32%",
        isLoss: false,
      },

      // =====================================
      // EXTRA HOLDINGS
      // =====================================

      {
        name: "TATASTEEL",
        qty: 5,
        avg: 150.00,
        price: 165.00,
        net: "+10.00%",
        day: "+2.50%",
        isLoss: false,
      },

      {
        name: "ADANIENT",
        qty: 2,
        avg: 2350.00,
        price: 2420.00,
        net: "+2.98%",
        day: "+1.25%",
        isLoss: false,
      },

      {
        name: "MARUTI",
        qty: 1,
        avg: 11800.00,
        price: 12150.00,
        net: "+2.96%",
        day: "+0.80%",
        isLoss: false,
      },

      {
        name: "AXISBANK",
        qty: 3,
        avg: 1080.00,
        price: 1125.00,
        net: "+4.16%",
        day: "+1.10%",
        isLoss: false,
      },

      {
        name: "ICICIBANK",
        qty: 2,
        avg: 1200.00,
        price: 1245.00,
        net: "+3.75%",
        day: "+0.95%",
        isLoss: false,
      },

      {
        name: "SUNPHARMA",
        qty: 2,
        avg: 1650.00,
        price: 1705.00,
        net: "+3.33%",
        day: "+0.72%",
        isLoss: false,
      },

      {
        name: "HCLTECH",
        qty: 3,
        avg: 1450.00,
        price: 1495.00,
        net: "+3.10%",
        day: "+0.60%",
        isLoss: false,
      },
    ];


    // Purana data delete karo
    await HoldingsModel.deleteMany({});


    // Naya data insert karo
    await HoldingsModel.insertMany(tempHoldings);


    res.status(200).json({
      success: true,
      message: `${tempHoldings.length} holdings added successfully`,
      count: tempHoldings.length,
    });

  } catch (error) {

    console.error("ADD HOLDINGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add holdings",
      error: error.message,
    });
  }
});


// ==========================================
// GET ALL HOLDINGS
// ==========================================

app.get("/allHoldings", async (req, res) => {
  try {

    const allHoldings = await HoldingsModel.find({});

    res.status(200).json(allHoldings);

  } catch (error) {

    console.error("FETCH HOLDINGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch holdings",
      error: error.message,
    });
  }
});


// ==========================================
// GET ALL POSITIONS
// ==========================================

app.get("/allPositions", async (req, res) => {
  try {

    const allPositions = await PositionsModel.find({});

    res.status(200).json(allPositions);

  } catch (error) {

    console.error("FETCH POSITIONS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch positions",
      error: error.message,
    });
  }
});


// ==========================================
// NEW ORDER
// ==========================================

app.post("/newOrder", async (req, res) => {

  try {

    console.log("Order received:", req.body);

    const newOrder = new OrdersModel({

      name: req.body.name,

      qty: Number(req.body.qty),

      price: Number(req.body.price),

      mode: req.body.mode,
    });


    const savedOrder = await newOrder.save();


    console.log("Order saved:", savedOrder);


    res.status(201).json({

      success: true,

      message: "Order saved successfully",

      order: savedOrder,
    });


  } catch (error) {

    console.error("ORDER SAVE ERROR:", error);


    res.status(500).json({

      success: false,

      message: "Order save failed",

      error: error.message,
    });
  }
});


// ==========================================
// GET ORDERS
// ==========================================

app.get("/orders", async (req, res) => {

  try {

    const orders = await OrdersModel
      .find()
      .sort({ _id: -1 });


    res.status(200).json({

      success: true,

      orders: orders,
    });


  } catch (error) {

    console.error("ERROR FETCHING ORDERS:", error);


    res.status(500).json({

      success: false,

      message: "Failed to fetch orders",

      error: error.message,
    });
  }
});


// ==========================================
// DATABASE + SERVER
// ==========================================

mongoose
  .connect(uri)
  .then(() => {

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {

      console.log(`Server running on port ${PORT}`);

    });

  })
  .catch((error) => {

    console.error("MongoDB connection failed:", error);

  });
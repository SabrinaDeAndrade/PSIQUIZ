const express = require("express");
const Result = require("../models/Result");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { tipoMBTI, score, total } = req.body;

  const result = await Result.create({
    user_id: req.userId,
    tipoMBTI,
    score,
    total,
    date_taken: new Date()
  });

  res.status(201).json(result);
});

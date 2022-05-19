const express = require("express");
const router = express.Router();
const multer = require("multer");

let storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "uploads/"),
	filename: (req, file, cb) => {
		const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
	},
});

router.post("/", (req, res) => {});

module.exports = router;

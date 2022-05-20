require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/fileModel");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueName = `${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}${path.extname(file.originalname)}`;
		cb(null, uniqueName);
	},
});

let upload = multer({
	storage,
	limit: { fileSize: 1000000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
	upload(req, res, async (err) => {
		if (!req.file) {
			return res.status(400).send("please upload file");
		}
		if (err) {
			return res.status(500).send({ error: err.message });
		}
		try {
			const file = new File({
				filename: req.file.filename,
				path: req.file.path,
				size: req.file.size,
				uuid: uuidv4(),
			});
			const response = await file.save();
			return res
				.status(201)
				.send({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
		} catch (e) {
			res.status(501).send(e.message);
		}
	});
});

module.exports = router;

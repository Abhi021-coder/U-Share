require("dotenv").config({ path: "./vars/.env" });
const mongoose = require("mongoose");

function connectDB() {
	mongoose.connect(process.env.MONGO_CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const connection = mongoose.connection;

	connection
		.once("open", () => console.log("Database Connected"))
		.on("error", (err) => console.log("Connection Failed", { err }));
}

module.exports = connectDB;

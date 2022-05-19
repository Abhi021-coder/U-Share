const express = require("express");
const connectDB = require("./config/db");
const fileRouter = require("./routes/files");

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use("/api/files", fileRouter);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

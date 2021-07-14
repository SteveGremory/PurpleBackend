import express from "express";
import bodyParser from "body-parser";
import AuthRoutes from "./Routes/AuthRoutes";
import mongoose from "mongoose";
import UserRoutes from "./Routes/UserRoutes";

mongoose.connect(
	"mongodb+srv://user1:2006@cluster0.kplqa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
);

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/HTML/index.html");
});

app.listen(process.env.PORT || 5000, () => {
	console.log(`Open up http://localhost:${5000}`);
});

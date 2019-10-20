const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
io.set("origins", "*:*");

require("./app/realtime")(io);

const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5009;

app.use(cors());
const crimeroutes = require("./app/routes/crime");
const userroutes = require("./app/routes/user");

const morgan = require("morgan");

const dbConfig = require("./config/database.config");
const jwtConfig = require("./config/jwt.config");
const mongoose = require("mongoose");

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", function() {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

mongoose.connection.once("open", function() {
  console.log("Successfully connected to the database");
});

app.use(morgan("dev"));

app.use("/api/", crimeroutes);
app.use("/api/user/", userroutes);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const helmet = require("helmet");

const bodyParser = require("body-parser");

dotenv.config();

global.root_dir = __dirname;

const app = express();

app.use(helmet());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const getData = require('./functions/data.function')

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  express.json({
    extended: false,
  })
);

// Define routes
require("./routes/index.routes")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Scheduling application." });
});

const job = nodeCron.schedule('0 * * * *', () => {
	console.log('Running hourly data fetch');
	console.log(new Date().toLocaleString());
	getData();
});

app.get('/get-data', (req, res) => {
	getData();
	res.send({ message: 'Started data pull' });
});

// Listen on PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

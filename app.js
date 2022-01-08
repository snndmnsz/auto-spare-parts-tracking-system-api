const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const systemRoutes = require("./routes/system");
const cutomerRoutes = require("./routes/customer");
const orderRoutes = require("./routes/order");
const partRoutes = require("./routes/part");
const userRoutes = require("./routes/user");

app.use(bodyParser.json());
app.use(express.json());

const port = 3001;

app.use(cors());

app.use(systemRoutes);
app.use(cutomerRoutes);
app.use(orderRoutes);
app.use(partRoutes);
app.use(userRoutes);

app.listen(port, () => console.log(`[API SERVER] listening on port ${port}!`));

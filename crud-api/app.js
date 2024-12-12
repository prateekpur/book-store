const express = require("express");
const bookRoutes = require("./routes/bookRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3001" }));
app.use("/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});

const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const router = require("./routers/routes")(auth, express);

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// app.use("/trips", tripsRouter);
// app.use("/items-catalog", packItemsRouter);
// app.use("/users", usersRouter);
// app.use(auth());

app.use(router);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

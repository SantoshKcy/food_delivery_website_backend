// const express = require("express")
// const connectDb = require("./config/db")
// const CustomerRouter = require("./routes/CustomerRoute")
// const RestaurantRouter = require("./routes/RestaurantRoute")
// const CategoryRouter = require("./routes/CategoryRoute")
// const ItemRouter = require("./routes/ItemRoute")
// const CartRouter = require("./routes/CartRoute")
// const OrderRouter = require("./routes/OrderRoute")
// const PaymentRouter = require("./routes/PaymentRoute")
// const WishlistRouter = require("./routes/WishlistRoute")
// const ReviewRouter = require("./routes/ReviewRoute")
// const AuthRouter = require("./routes/AuthRoute")
// const app = express();
// connectDb();

// app.use(express.json());
// app.use("/api/customer", CustomerRouter);
// app.use("/api/restaurant", RestaurantRouter);
// app.use("/api/category", CategoryRouter);
// app.use("/api/item", ItemRouter);
// app.use("/api/cart", CartRouter);
// app.use("/api/order", OrderRouter);
// app.use("/api/wishlist", WishlistRouter);
// app.use("/api/payment", PaymentRouter)
// app.use("/api/review", ReviewRouter)
// app.use("/api/auth", AuthRouter);



// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`)

// })
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize"); // for sql injection
const helmet = require("helmet");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.options("*", cors());

// Load env file
dotenv.config({
    path: "./config/config.env",
});

// Connect to database
connectDB();

// Route files
const auth = require("./routes/customer");

// Body parser
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('public'));

// Mount routers
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
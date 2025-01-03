const express = require("express")
const connectDb = require("./config/db")
const CustomerRouter = require("./routes/customerRoute")
const RestaurantRouter = require("./routes/RestaurantRoute")
const CategoryRouter = require("./routes/CategoryRoute")
const ItemRouter = require("./routes/ItemRoute")
const CartRouter = require("./routes/CartRoute")
const OrderRouter = require("./routes/OrderRoute")
const PaymentRouter = require("./routes/PaymentRoute")
const WishlistRouter = require("./routes/WishlistRoute")
const ReviewRouter = require("./routes/ReviewRoute")
const AuthRouter = require("./routes/AuthRoute")
const app = express();
connectDb();

app.use(express.json());
app.use("/api/customer", CustomerRouter);
app.use("/api/restaurant", RestaurantRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/item", ItemRouter);
app.use("/api/cart", CartRouter);
app.use("/api/order", OrderRouter);
app.use("/api/wishlist", WishlistRouter);
app.use("/api/payment", PaymentRouter)
app.use("/api/review", ReviewRouter)
app.use("/api/auth", AuthRouter);



const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)

})
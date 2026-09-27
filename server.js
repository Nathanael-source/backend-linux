
require("dotenv").config();

const express = require("express");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API berhasil berjalan"
    });
});

app.use("/users", usersRouter);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

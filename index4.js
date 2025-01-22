const express = require('express');
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")


app.use(express.json());
app.use(cors())

app.post('/', (req, res) => {
    res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

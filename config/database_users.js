const mongoose = require('mongoose');

const connectDBu = () => {
    const uri = `mongodb+srv://danielco7:1oz2dan@cluster0.kkfjt.mongodb.net/Users?retryWrites=true&w=majority`
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    mongoose.connect(uri, options);
};

const dbu = mongoose.connection;
dbu.on("error", console.error.bind(console, "connection error: "));
dbu.once("open", function () {
    console.log("Connected successfully");
});
module.exports = connectDBu;
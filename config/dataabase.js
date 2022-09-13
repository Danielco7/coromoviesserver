const mongoose = require("mongoose");

const connectDBs = () => {
  const uri = `mongodb+srv://danielco7:1oz2dan@cluster0.kkfjt.mongodb.net/Subscriptions?retryWrites=true&w=majority`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(uri, options);
};

const dbs = mongoose.connection;
dbs.on("error", console.error.bind(console, "connection error: "));
dbs.once("open", function () {
  console.log("Connected successfully1");
});

module.exports = connectDBs;

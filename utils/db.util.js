const goose = require("mongoose");
const server = require('./server');
const connectionOptions = {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
};

function connect() {
  let connectionString = process.env.REMOTE_DB;

  goose.connect(connectionString, connectionOptions)
    .catch((err) => {
      console.log("Error! Could not connect to database server.")
    });

  goose.connection.on("connected", () => {
    console.log("Connected to Database");
    server.startServer()
  });

  goose.Promise = global.Promise;
}

function disconnect() {
  goose.disconnect();
  goose.connection.close("disconnected", () => {
    console.log("Disconnected from Database");
  });
}

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  connect,
  disconnect,
  isValidId,
};

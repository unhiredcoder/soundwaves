const mongoose=require("mongoose")
const url = "mongodb://proboys777333:pritambhai@ac-rrmx7kp-shard-00-00.5kqktya.mongodb.net:27017,ac-rrmx7kp-shard-00-01.5kqktya.mongodb.net:27017,ac-rrmx7kp-shard-00-02.5kqktya.mongodb.net:27017/?ssl=true&replicaSet=atlas-67jp7r-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database Successfully!'))
  .catch((err) => { console.error("Error is" + err); });
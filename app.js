const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require('multer');
const port = 4000||process.env.PORT;
const cors = require("cors");
const Image = require("./db/dbschema");
app.use('/uploads', express.static('./uploads'));

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://proboys777333:pritambhai@ac-rrmx7kp-shard-00-00.5kqktya.mongodb.net:27017,ac-rrmx7kp-shard-00-01.5kqktya.mongodb.net:27017,ac-rrmx7kp-shard-00-02.5kqktya.mongodb.net:27017/?ssl=true&replicaSet=atlas-67jp7r-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());


const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});



// Handle the POST request for uploading an image
app.post('/upload', upload.fields([{ name: 'image' }, { name: 'audio'}]), async (req, res) => {
  try {
    const { username } = req.body;
    const image = req.files['image'][0];
    const audio = req.files['audio'][0];

    // Create a new Image document
    const newImage = new Image({
      username,
      image: image.filename,
      audio: audio.filename,
    });

    // Save the Image document to the database
    const savedImage = await newImage.save();

    res.status(200).json({
      message: 'Image and audio uploaded successfully.',
      image: savedImage.image,
      audio: savedImage.audio,
    });
  } catch (error) {
    res.status(500).send('Error uploading image and audio.');
  }
});


app.get("/",async (req,res)=>{
  res.send("i am live")
})

app.get('/users', async (req, res) => {
  const users = await Image.find();
  res.status(200).json(users);
});



const path=require("path")
const fs = require("fs");

app.delete('/delete', async (req, res) => {
  const { _id, image, audio } = req.body;
  try {
    const result = await Image.findByIdAndRemove(_id);
    if (result) {
      const filePath = path.join(__dirname, 'uploads', image);
      const filePath2 = path.join(__dirname, 'uploads', audio);
      fs.unlinkSync(filePath);
      fs.unlinkSync(filePath2);
      res.status(200).json({ message: 'User and associated image deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user and associated image.', error: error.message });
  }
});

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
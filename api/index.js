const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
const Place = require('./models/Place.js')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = '95616d0ccdb40e023169c32f1d47e8e3d7736c0dc8f9b8b0900d0a008ef81f58';
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config()
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);
// console.log(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json(`test Okay`);
});
app.post('/register', async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
                // name:userDoc.name
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json(`pass not OK`);
        }
    } else {
        res.json(`not found`);
    }
})
//bookapply1234 

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        })
    } else {
        res.json(null)
    }
    // res.json({token});   
})

app.post('/logout', (req, res) => {
    res.cookie(`token`, ``).json(true);
});

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
     console.log('Received link:', link);
    const newName = 'photo' + Date.now() + '.jpg';

    try {
        await imageDownloader.image({
            url: link,
            dest: path.join(uploadsDir, newName),
        });

        res.json(newName);
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static('uploads'));


// app.post('/upload-by-link',async (req,res) =>{
//     const { link } = req.body;
//     const newName = 'photo' + Date.now() + '.jpg';
//     try{
//     await imageDownloader.image({
//         url: link,
//         dest: __dirname + 'uploads' + newName,
//     });
//     res.json(newName);
//      } catch(error){
//         console.error('Error',error);
//         res.status(500).send('Internal Server Error');
//      }
// });


const photoMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + `.` + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests,
        });
        res.json(placeDoc);
    });
});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});
app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests,
            });
            await placeDoc.save();
            res.json(`Okay Update Successful`)
        }
    });
});

app.get('/places', async(req,res)=>{
    res.json(await Place.find());
})

app.listen(4000);
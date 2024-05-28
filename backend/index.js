const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

console.log(process.env.MONGO_URI);
app.get('/', (req, res) => {
  res.send('Express App is running');
});

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

const Product = mongoose.model('Product', {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

app.post('/addproduct', async (req, res) => {
  const { name, image, category, new_price, old_price } = req.body;
  let products = await Product.find();
  let id;
  if (products.length > 0) {
    let lastProduct = products.slice(-1)[0];
    id = lastProduct.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id,
    name,
    image,
    category,
    new_price: +new_price,
    old_price: +old_price,
  });
  console.log(product);
  await product.save();
  console.log('Saved');
  res.json({ success: true, name });
});

app.delete('/removeproduct/:id', async (req, res) => {
  let product = await Product.findOneAndDelete({ id: +req.params.id });
  console.log('Product Removed');
  res.json({
    success: true,
    product,
  });
});

app.get('/products', async (req, res) => {
  let products = await Product.find();
  console.log('Fetched all Products');
  res.send(products);
});

const User = mongoose.model('User', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const check = await User.findOne({ email: email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: 'Existing user found with same email address',
    });
  }
  let cartData = {};
  for (let i = 0; i < 300; i++) {
    cartData[i] = 0;
  }
  const user = new User({
    name,
    email,
    password,
    cartData,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const passMatch = password == user.password;
    if (passMatch) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: 'Wrong Password' });
    }
  } else {
    res.json({ success: false, errors: 'Wrong Email address' });
  }
});

app.get('/newcollection', async (req, res) => {
  let products = await Product.find();
  let newCollection = products.slice(1).slice(-8);
  res.send(newCollection);
});

app.get('/popular', async (req, res) => {
  let products = await Product.find();
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  shuffleArray(products);
  let popularProducts = products.slice(0, 4);
  res.send(popularProducts);
});

const fetchUser = async (req, res, next) => {
  const token = req.header('auto-token');
  if (!token) {
    res.status(401).send({ errors: 'Please authenticate using valid login' });
  } else {
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate using valid token' });
    }
  }
};

app.post('/addtocart', fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send('Added');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

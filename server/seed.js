const dotenv   = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Product  = require('./models/Product');

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name:        'Wireless Headphones',
    description: 'Premium noise-cancelling over-ear headphones with 30-hour battery life.',
    price:       79.99,
    category:    'Electronics',
    image:       'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    stock:       100,
  },
  {
    name:        'Running Shoes',
    description: 'Lightweight performance running shoes with extra cushioning.',
    price:       59.99,
    category:    'Footwear',
    image:       'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    stock:       100,
  },
  {
    name:        'Coffee Maker',
    description: 'Programmable 12-cup drip coffee maker with built-in grinder.',
    price:       49.99,
    category:    'Kitchen',
    image:       'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop',
    stock:       100,
  },
  {
    name:        'Leather Backpack',
    description: 'Genuine leather backpack with laptop compartment up to 15 inches.',
    price:       89.99,
    category:    'Bags',
    image:       'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    stock:       100,
  },
  {
    name:        'Sunglasses',
    description: 'UV400 polarized sunglasses with lightweight titanium frame.',
    price:       34.99,
    category:    'Accessories',
    image:       'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
    stock:       100,
  },
  {
    name:        'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches and aluminium body.',
    price:       99.99,
    category:    'Electronics',
    image:       'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    stock:       100,
  },
  {
    name:        'Smart Watch',
    description: 'Fitness smart watch with heart rate monitor and GPS tracking.',
    price:       129.99,
    category:    'Electronics',
    image:       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    stock:       100,
  },
{
  name:        'Yoga Mat',
  description: 'Non-slip eco-friendly yoga mat with carrying strap.',
  price:       29.99,
  category:    'Sports',
  image:       'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop',
  stock:       100,
},
  {
    name:        'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and USB charging port.',
    price:       39.99,
    category:    'Home',
    image:       'https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?w=400&h=300&fit=crop',
    stock:       100,
  },
  {
    name:        'Water Bottle',
    description: 'Insulated stainless steel water bottle keeps drinks cold 24 hours.',
    price:       24.99,
    category:    'Sports',
    image:       'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    stock:       100,
  },
{
  name:        'Bluetooth Speaker',
  description: 'Portable waterproof bluetooth speaker with 360 degree sound.',
  price:       49.99,
  category:    'Electronics',
  image:       'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
  stock:       100,
},
{
  name:        'Gaming Mouse',
  description: 'High precision gaming mouse with 7 programmable buttons and RGB lighting.',
  price:       44.99,
  category:    'Electronics',
  image:       'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
  stock:       100,
},
{
  name:        'Denim Jacket',
  description: 'Classic fit denim jacket with button closure and chest pockets.',
  price:       69.99,
  category:    'Clothing',
  image:       'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400&h=300&fit=crop',
  stock:       100,
},
{
  name:        'Camping Tent',
  description: 'Waterproof 2-person camping tent easy setup in under 5 minutes.',
  price:       119.99,
  category:    'Outdoors',
  image:       'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
  stock:       100,
},
{
  name:        'Wooden Chess Set',
  description: 'Handcrafted wooden chess set with storage drawer for pieces.',
  price:       54.99,
  category:    'Games',
  image:       'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop',
  stock:       100,
},
{
  name:        'Scented Candle',
  description: 'Luxury soy wax scented candle with lavender and vanilla fragrance.',
  price:       19.99,
  category:    'Home',
  image:       'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop',
  stock:       100,
},
{
  name:        'Cycling Helmet',
  description: 'Lightweight aerodynamic cycling helmet with ventilation system.',
  price:       64.99,
  category:    'Sports',
  image:       'https://images.unsplash.com/photo-1557803175-b5a4fbe38778?w=400&h=300&fit=crop',
  stock:       100,
},
{
  name:        'Potted Succulent',
  description: 'Low maintenance indoor succulent plant in a ceramic pot.',
  price:       14.99,
  category:    'Home',
  image:       'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop',
  stock:       100,
},
{
  name:        'Protein Shaker',
  description: 'BPA free protein shaker bottle with mixing ball and measurement marks.',
  price:       12.99,
  category:    'Sports',
  image:       'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop',
  stock:       100,
},
{
  name:        'Polaroid Camera',
  description: 'Instant film camera with built-in flash and selfie mirror.',
  price:       89.99,
  category:    'Electronics',
  image:       'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
  stock:       100,
},
];

const seed = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Database seeded with 10 products!');
  process.exit();
};

seed();
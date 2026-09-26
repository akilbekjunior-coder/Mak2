import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Тестовый массив объявлений
const sampleListings = [
  {
    id: '127841',
    title: "Nukus markazida 3 xonali shinam xonadon",
    price: 450000000,
    type: "sell",
    category: "apartment",
    location: "Nukus Markaz",
    rooms: 3,
    area: 78,
    isFeatured: true,
    hasIpoteka: true,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800"
  },
  {
    id: '126675',
    title: "2 qavatli hovli uy, barcha sharoitlari bilan",
    price: 820000000,
    type: "sell",
    category: "house",
    location: "22-mkr",
    rooms: 5,
    area: 240,
    isFeatured: false,
    hasIpoteka: true,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800"
  }
];

app.get('/', (req, res) => {
  res.send("Maklerim API serveri muvaffaqiyatli ishlamoqda! 🚀");
});

app.get('/api/listings', (req, res) => {
  res.json({
    success: true,
    count: sampleListings.length,
    data: sampleListings
  });
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} manzilida ishlamoqda`);
});

// server/index.js faylingiz pastki qismiga (app.listen'dan tepaga) qo'shing:

app.post('/api/listings', (req, res) => {
  try {
    const newProperty = {
      id: Date.now().toString(), // unikallik uchun ID
      ...req.body
    };

    // Massiv boshiga yangi e'lonni qo'shamiz
    sampleListings.unshift(newProperty);

    res.status(201).json({
      success: true,
      message: "E'lon muvaffaqiyatli qo'shildi!",
      data: newProperty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi",
      error: error.message
    });
  }
});

app.post('/api/listings', (req, res) => {
  try {
    const newProperty = {
      id: Date.now().toString(),
      type: req.body.type || 'sell', // Agar kelmasa 'sell' qilib belgilaydi
      category: req.body.category || 'apartment',
      isFeatured: false,
      hasIpoteka: req.body.hasIpoteka || false,
      image: req.body.image || 'https://images.unsplash.com/photo-1560511828-264566fa31d6?q=80&w=800', // Standart rasm
      ...req.body
    };

    sampleListings.unshift(newProperty); // Massiv boshiga qo'shish

    res.status(201).json({
      success: true,
      data: newProperty
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
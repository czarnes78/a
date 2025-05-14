const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let cars = [
  {
    id: 1,
    name: 'Fiat 500',
    segment: 'klasa a',
    type: 'hatchback',
    mileage: 45000,
    engine: '1.2 Benzyna',
    year: 2020,
    childSeat: true,
    features: ['Klimatyzacja', 'Bluetooth', 'USB'],
    description: 'Małe miejskie auto idealne na codzienne dojazdy.',
    price: 200,
    image: 'https://api.pgd.pl/uploads_fiat/Models/Nowy-Fiat-500/500_Hatchback_Icon.jpg'
  },
  {
    id: 2,
    name: 'Toyota Aygo X',
    segment: 'klasa a',
    type: 'crossover',
    mileage: 23000,
    engine: '1.0 Benzyna',
    year: 2022,
    childSeat: false,
    features: ['Kamera cofania', 'Apple CarPlay'],
    description: 'Nowoczesny crossover dla wymagających.',
    price: 200,
    image: 'https://www.toyotanews.eu/images/rrrcontent/articles/article_1013_1013_S1hFdAFC.jpg'
  }
];

let reservations = [];
let reservationHistory = [];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ticketpoczta01@gmail.com',
    pass: 'soba bkea iaty rjeq'
  }
});

function sendDecisionEmail(email, name, carName, action) {
  const subject = action === 'accept' ? 'Rezerwacja zatwierdzona' : 'Rezerwacja odrzucona';
  const text = action === 'accept'
    ? `Dzień dobry ${name},\n\nTwoja rezerwacja samochodu ${carName} została zaakceptowana.`
    : `Dzień dobry ${name},\n\nNiestety nie możemy zrealizować Twojej rezerwacji samochodu ${carName}.`;

  const mailOptions = {
    from: 'twojemail@gmail.com',
    to: email,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Błąd przy wysyłce maila:', error);
    }
    console.log('Email wysłany:', info.response);
  });
}

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(c => c.id === id);
  if (!car) return res.status(404).send('Nie znaleziono auta');
  res.json(car);
});

app.post('/api/reservations', (req, res) => {
  const reservation = { ...req.body, timestamp: new Date().toISOString() };
  reservations.push(reservation);
  res.status(201).json({ message: 'Zarejestrowano zapytanie' });
});

app.get('/api/reservations', (req, res) => {
  res.json(reservations);
});

app.post('/api/reservations/archive', (req, res) => {
  const { action, originalTimestamp, ...rest } = req.body;

  reservationHistory.push({
    ...rest,
    action,
    timestamp: new Date().toISOString()
  });

  reservations = reservations.filter(r => r.timestamp !== originalTimestamp);

  // Wyślij e-mail z decyzją
  sendDecisionEmail(rest.email, rest.name, rest.carName, action);

  res.status(200).json({ message: 'Zarchiwizowano i wysłano e-mail' });
});

app.get('/api/reservations/history', (req, res) => {
  res.json(reservationHistory);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

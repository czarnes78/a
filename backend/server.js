// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let requests = []; // 🧠 tymczasowa baza danych w RAM

let cars = [
    {
    id: 1,
    name: 'Fiat 500',
    segment: 'KLASA A',
    type: 'hatchback',
    image: 'https://stellantis3.dam-broadcast.com/medias/domain12808/media108037/2411333-wq6afnhq5s-whr.jpg',
    price: 200,
    features: ['Klimatyzacja', 'Bluetooth', 'USB'],
    mileage: 30000,
    engine: '1.0 Hybrid 70KM',
    year: 2021,
    childSeat: true,
    description: 'Stylowy maluch idealny do miasta.'
  },
  {
    id: 2,
    name: 'Toyota Aygo X',
    segment: 'KLASA A',
    type: 'crossover',
    image: 'https://scene7.toyota.eu/is/image/toyotaeurope/Aygo-zalety_foto_PL_1280x1277_1?wid=1280&fit=fit,1&ts=0&resMode=sharp2&op_usm=1.75,0.3,2,0',
    price: 200,
    features: ['Kamera cofania', 'Apple CarPlay', 'Klimatyzacja'],
    mileage: 15000,
    engine: '1.0 VVT-i 72KM',
    year: 2023,
    childSeat: true,
    description: 'Kompaktowy crossover do miejskich przygód.'
  },
  {
    id: 3,
    name: 'Hyundai i10',
    segment: 'KLASA A',
    type: 'hatchback',
    image: 'https://www.autocentrum.pl/MjAyMy5qYgsgGztKGgpvH2NDb1ZUEmAMKBUoVlYQP0c3HD8KXB4jRXdNLE8MFXxddUkvSVYQfQt2GHxPAkB7WG4RNAxbFSwDbBB8SRgYJANsESwNVhkvCyISYB9UEigGKB85EFsWYFtsSWAURRhgXHYSIFQBSCYdbBYpVAdBf1lvEz0eFww',
    price: 200,
    features: ['Klimatyzacja', 'Bluetooth', 'Czujniki parkowania'],
    mileage: 25000,
    engine: '1.2 MPI 84KM',
    year: 2022,
    childSeat: true,
    description: 'Zwrotny i ekonomiczny – idealny na codzienne dojazdy.'
  },
  {
    id: 4,
    name: 'Volkswagen up!',
    segment: 'KLASA A',
    type: 'hatchback',
    image: 'https://www.autocentrum.pl/OWRkLmpwYDYzCTpeXwxtInBRbkIRFGIxOwcpQhMWPXokDj4eGRgheGcIKFlARHxlMVx4D0NCejVlXngPRE4rM3wBPApSCg',
    price: 200,
    features: ['Klimatyzacja', 'AUX', 'System multimedialny'],
    mileage: 40000,
    engine: '1.0 75KM',
    year: 2021,
    childSeat: true,
    description: 'Oszczędny miejski samochód.'
  },
  {
    id: 5,
    name: 'Kia Picanto',
    segment: 'KLASA A',
    type: 'hatchback',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jeZSj0TczecTgqABLjcIFV2sa_0jspWAYQ&s',
    price: 200,
    features: ['Bluetooth', 'Tempomat', 'Kamera cofania'],
    mileage: 20000,
    engine: '1.0 T-GDi 100KM',
    year: 2022,
    childSeat: true,
    description: 'Mały, ale z charakterem.'
  },
]

// Zwraca wszystkie auta
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

// Zwraca jedno auto po ID
app.get('/api/cars/:id', (req, res) => {
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: 'Nie znaleziono auta' });
  }
});

app.post('/api/reservations', (req, res) => {
  const data = req.body;
  data.timestamp = new Date().toISOString();
  requests.push(data);
  res.status(201).json({ message: 'Zapytanie zapisane' });
});

app.get('/api/reservations', (req, res) => {
  res.json(requests);
});

app.listen(PORT, () => {
  console.log(`Backend działa na http://localhost:${PORT}`);
});

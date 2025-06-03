require("dotenv").config();

const express = require("express");
<<<<<<< HEAD
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

=======
const cors = require('cors');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const axios = require("axios");
const rateLimit = require('express-rate-limit'); // ⬅️ Dodane
const jwt = require('jsonwebtoken');
const helmet = require('helmet');

const app = express();

// Ustaw CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com", "'unsafe-inline'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://api.pgd.pl", "https://spots.ag", "https://cdn-icons-png.flaticon.com"],
      connectSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameSrc: ["'self'", "https://www.google.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 godzina
  max: 250, // 250 requestów na godzinę
  message: 'Zbyt wiele żądań z tego adresu IP, spróbuj ponownie za godzinę.'
});
app.use(limiter);

// Cors i inne middleware
app.use(cors({
  origin: ['https://d25swaqypznmn6.cloudfront.net'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

app.get("/debug", (req, res) => {
  res.json({ reservationHistory, reservations });
});

app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
      console.log('Odczytano JWT:', decoded);
    } catch (err) {
      console.warn('Niepoprawny JWT (ale ignoruję)', err.message);
    }
  }
  
  next();
});

app.get("/api/test-jwt", (req, res) => {
  const payload = { user: "admin", role: "admin" };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' });
  res.json({ token });
});


>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
let cars = [
  {
    id: 1,
    name: "Fiat 500",
    segment: "klasa a",
    type: "hatchback",
    mileage: 45000,
    engine: "1.2 Benzyna",
    year: 2020,
    childSeat: true,
    features: ["Klimatyzacja", "Bluetooth", "USB"],
    description: "Małe miejskie auto idealne na codzienne dojazdy.",
    price: 200,
    image:
      "https://api.pgd.pl/uploads_fiat/Models/Nowy-Fiat-500/500_Hatchback_Icon.jpg",
  },
  {
    id: 2,
    name: "Toyota Aygo X",
    segment: "klasa a",
    type: "crossover",
    mileage: 23000,
    engine: "1.0 Benzyna",
    year: 2022,
    childSeat: false,
    features: ["Kamera cofania", "Apple CarPlay"],
    description: "Nowoczesny crossover dla wymagających.",
    price: 200,
    image:
      "https://www.toyotanews.eu/images/rrrcontent/articles/article_1013_1013_S1hFdAFC.jpg",
  },
  {
    id: 3,
    name: "Hyundai i10",
    segment: "Klasa A",
    type: "hatchback",
    image:
      "https://www.autocentrum.pl/MjAyMy5qYgsgGztKGgpvH2NDb1ZUEmAMKBUoVlYQP0c3HD8KXB4jRXdNLE8MFXxddUkvSVYQfQt2GHxPAkB7WG4RNAxbFSwDbBB8SRgYJANsESwNVhkvCyISYB9UEigGKB85EFsWYFtsSWAURRhgXHYSIFQBSCYdbBYpVAdBf1lvEz0eFww",
    price: 200,
    features: ["Klimatyzacja", "Bluetooth", "Czujniki parkowania"],
    mileage: 25000,
    engine: "1.2 MPI 84KM",
    year: 2022,
    childSeat: true,
    description: "Zwrotny i ekonomiczny – idealny na codzienne dojazdy.",
  },
  {
    id: 4,
    name: "Volkswagen up!",
    segment: "Klasa A",
    type: "hatchback",
    image:
      "https://www.autocentrum.pl/OWRkLmpwYDYzCTpeXwxtInBRbkIRFGIxOwcpQhMWPXokDj4eGRgheGcIKFlARHxlMVx4D0NCejVlXngPRE4rM3wBPApSCg",
    price: 200,
    features: ["Klimatyzacja", "AUX", "System multimedialny"],
    mileage: 40000,
    engine: "1.0 75KM",
    year: 2021,
    childSeat: true,
    description: "Oszczędny miejski samochód.",
  },
  {
    id: 5,
    name: "Kia Picanto",
    segment: "Klasa A",
    type: "hatchback",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jeZSj0TczecTgqABLjcIFV2sa_0jspWAYQ&s",
    price: 200,
    features: ["Bluetooth", "Tempomat", "Kamera cofania"],
    mileage: 20000,
    engine: "1.0 T-GDi 100KM",
    year: 2022,
    childSeat: true,
    description: "Mały, ale z charakterem.",
  },
  {
    id: 6,
    name: "Renault Clio",
    segment: "Klasa B",
    type: "hatchback",
    image:
      "https://dabrowscy.pl/application/files/cache/7bab62ab-cb25-4d63-bc05-d38f7e35ee0d-1744930659.webp",
    price: 250,
    features: ["Kamera cofania", "Android Auto", "Klimatyzacja"],
    mileage: 35000,
    engine: "1.0 TCe 90KM",
    year: 2022,
    childSeat: true,
    description: "Stylowy i wygodny na krótkie oraz średnie trasy.",
  },
  {
    id: 7,
    name: "Peugeot 208",
    segment: "Klasa B",
    type: "hatchback",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHitEahuU1YC_-72M_6We4sVpoVfYb-KQUw&s",
    price: 250,
    features: ["Bluetooth", "Czujniki cofania", "LED"],
    mileage: 22000,
    engine: "1.2 PureTech 100KM",
    year: 2023,
    childSeat: true,
    description: "Nowoczesny design i oszczędny silnik.",
  },
  {
    id: 8,
    name: "Opel Corsa",
    segment: "Klasa B",
    type: "hatchback",
    image:
      "https://webp-konwerter.incdn.pl/eyJmIjoiaHR0cHM6Ly9nM/i5pbmZvci5wbC9wL19maW/xlcy8yNzQwMDAvN19vcGV/sY29yc2EyOTI4NjEuanBnIn0.jpg",
    price: 250,
    features: ["Klimatyzacja", "Apple CarPlay", "Kamera cofania"],
    mileage: 28000,
    engine: "1.2 Turbo 100KM",
    year: 2022,
    childSeat: true,
    description: "Dynamiczny i zwinny do miasta i poza.",
  },
  {
    id: 9,
    name: "Skoda Fabia",
    segment: "Klasa B",
    type: "hatchback",
    image:
      "https://i0.wp.com/wokolmotoryzacji.pl/wp-content/uploads/2020/11/skoda-fabia-2021-adelanto-diseno-202072434-1604397957-7.jpg?resize=600%2C372&ssl=1",
    price: 250,
    features: ["Czujniki parkowania", "Bluetooth", "Tempomat"],
    mileage: 33000,
    engine: "1.0 TSI 95KM",
    year: 2021,
    childSeat: true,
    description: "Praktyczny i przestronny hatchback.",
  },
  {
    id: 10,
    name: "Seat Ibiza",
    segment: "Klasa B",
    type: "hatchback",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbyxGTIqZdiOUUpDKYolOigXDpfiaB9_IB9Q&s",
    price: 250,
    features: ["Klimatyzacja", "Android Auto", "Kamera"],
    mileage: 30000,
    engine: "1.0 TSI 95KM",
    year: 2022,
    childSeat: true,
    description: "Świetna propozycja dla młodych kierowców.",
  },
  {
    id: 11,
    name: "Toyota Corolla",
    segment: "Klasa C",
    type: "sedan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIVB4P69lyBRt7n4qMC7pXWniLfN_tcxQpYQ&s",
    price: 300,
    features: ["Klimatyzacja", "Bluetooth", "Kamera cofania"],
    mileage: 45000,
    engine: "1.8 Hybrid 122KM",
    year: 2022,
    childSeat: true,
    description: "Niezawodny sedan hybrydowy, idealny na długie trasy.",
  },
  {
    id: 12,
    name: "Mazda 3",
    segment: "Klasa C",
    type: "hatchback",
    image:
      "https://media-assets.mazda.eu/image/upload/q_auto,f_auto/mazdapl/globalassets/cars/2024-mazda3-hatchback/mme_m3_hb_bhpmeaa_46v_46v_7-8_prime.png?rnd=49911c",
    price: 350,
    features: ["Head-Up", "Kamera 360", "Tempomat"],
    mileage: 42000,
    engine: "2.0 Skyactiv-G 122KM",
    year: 2022,
    childSeat: true,
    description: "Styl i jakość jazdy klasy premium.",
  },
  {
    id: 13,
    name: "Hyundai i30",
    segment: "Klasa C",
    type: "hatchback",
    image:
      "https://www.onlineauto.com.au/dA/d475e1f5fb/fileAsset/filter/Webp/webp_q/50",
    price: 320,
    features: ["Klimatyzacja", "Bluetooth", "Czujniki"],
    mileage: 36000,
    engine: "1.5 DPI 110KM",
    year: 2022,
    childSeat: true,
    description: "Komfortowy i przestronny samochód.",
  },
  {
    id: 14,
    name: "Kia Ceed",
    segment: "Klasa C",
    type: "kombi",
    image:
      "https://www.kia.com/content/dam/kwcms/kme/global/en/assets/vehicles/cd-sw/discover/kia-ceed-sportswagon-ice-my25-34-front.jpg",
    price: 340,
    features: ["Automatyczna klimatyzacja", "Apple CarPlay"],
    mileage: 33000,
    engine: "1.5 T-GDI 160KM",
    year: 2022,
    childSeat: true,
    description: "Idealny wybór dla rodziny.",
  },
  {
    id: 15,
    name: "Volkswagen Golf",
    segment: "Klasa C",
    type: "hatchback",
    image:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3170/",
    price: 350,
    features: ["Tempomat", "Apple CarPlay", "Klimatyzacja"],
    mileage: 38000,
    engine: "2.0 TDI 115KM",
    year: 2022,
    childSeat: true,
    description: "Świetna wersja dla tych, którzy szukają komfortu.",
  },
  {
    id: 16,
    name: "Ford Focus",
    segment: "Klasa C",
    type: "hatchback",
    image:
      "https://www.autocentrum.pl/OWNiLmpwYDYvCzpeXwxtImxTbkIRFGIxJwUpQhMWPXo4DD4eGRgheHsKKV9JQnsxe155XUIWKWd2DX1fFk4sNWADPApSCg",
    price: 330,
    features: ["Bluetooth", "Klimatyzacja", "Czujniki parkowania"],
    mileage: 29000,
    engine: "1.0 EcoBoost 125KM",
    year: 2021,
    childSeat: true,
    description: "Dynamiczny hatchback z nowoczesnym wyglądem.",
  },
  {
    id: 17,
    name: "Honda Civic",
    segment: "Klasa C",
    type: "sedan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1dtUNCDNCImmUpQWyNZo9XHCYuNK486kDA&s",
    price: 370,
    features: ["System multimedialny", "Android Auto", "Klimatyzacja"],
    mileage: 25000,
    engine: "1.5 VTEC Turbo 182KM",
    year: 2022,
    childSeat: true,
    description: "Sportowy sedan z mocnym silnikiem.",
  },
  {
    id: 18,
    name: "BMW 1 Series",
    segment: "Klasa C",
    type: "hatchback",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGxbFyhVacVbYIZ5USIHP14EBg9SJ0G1NMPg&s",
    price: 450,
    features: ["Head-up display", "Czujniki parkowania", "Klimatyzacja"],
    mileage: 28000,
    engine: "2.0 190KM",
    year: 2021,
    childSeat: true,
    description: "Premium hatchback z eleganckim wyglądem.",
  },
  {
    id: 19,
    name: "Audi A3",
    segment: "Klasa C",
    type: "sedan",
    image: "https://img.chceauto.pl/audi/a3/audi-a3-sedan-4370-47741_head.jpg",
    price: 470,
    features: ["Klimatyzacja", "Tempomat", "Apple CarPlay"],
    mileage: 27000,
    engine: "1.5 TFSI 150KM",
    year: 2021,
    childSeat: true,
    description: "Elegancki i komfortowy sedan premium.",
  },
  {
    id: 20,
    name: "Mercedes-Benz A-Class",
    segment: "Klasa C",
    type: "hatchback",
    image:
      "https://www.mercedes-benz.pl/content/dam/hq/passengercars/cars/a-class/hatchback-w177-fl-pi/overview/teaser/03-2023/images/mercedes-benz-a-class-w177-teaser-exterior-3302x1858-03-2023.jpg/1742299159044.jpg?im=Crop,rect=(0,0,3302,1857);Resize=(1280,720)",
    price: 500,
    features: ["Czujniki parkowania", "Klimatyzacja", "Apple CarPlay"],
    mileage: 30000,
    engine: "1.3 163KM",
    year: 2021,
    childSeat: true,
    description: "Wysoka jakość, luksusowy hatchback.",
  },
  {
    id: 21,
    name: "Peugeot 3008",
    segment: "Klasa D",
    type: "SUV",
    image:
      "https://visuel3d-secure.peugeot.com/V3DImage.ashx?client=CFGAP3D&mkt=PL&env=PROD&version=1PPDSYRJH7C0A0C2&ratio=1&format=jpg&quality=90&width=640&view=006&color=0MM00N7K&trim=0PW60RFX&opt1=JD02&opt2=ZHQM&back=0",
    price: 600,
    features: ["Klimatyzacja", "Panoramiczny dach", "System multimedialny"],
    mileage: 25000,
    engine: "1.5 BlueHDi 130KM",
    year: 2021,
    childSeat: true,
    description: "Elegancki SUV o wysokim komforcie jazdy.",
  },
  {
    id: 22,
    name: "Ford Kuga",
    segment: "Klasa D",
    type: "SUV",
    image:
      "https://img.chceauto.pl/ford/kuga/ford-kuga-suv-4528-50171_head.webp",
    price: 650,
    features: ["Kamera 360", "System multimedialny", "Tempomat"],
    mileage: 35000,
    engine: "2.0 EcoBlue 150KM",
    year: 2021,
    childSeat: true,
    description: "Nowoczesny SUV z przestronnym wnętrzem.",
  },
  {
    id: 23,
    name: "Volkswagen Tiguan",
    segment: "Klasa D",
    type: "SUV",
    image:
      "https://aaaautoeuimg.vshcdn.net/thumb/300137153_1024x768x100.jpg?35219",
    price: 700,
    features: ["Klimatyzacja", "Apple CarPlay", "Czujniki parkowania"],
    mileage: 28000,
    engine: "2.0 TDI 150KM",
    year: 2021,
    childSeat: true,
    description: "Komfortowy SUV z nowoczesnym napędem.",
  },
  {
    id: 24,
    name: "Hyundai Tucson",
    segment: "Klasa D",
    type: "SUV",
    image:
      "https://margo.pl/wp-content/uploads/2021/04/hyundai-tucson-mistrz-wartoscii-e2e.png",
    price: 680,
    features: ["Tempomat", "Klimatyzacja", "Czujniki parkowania"],
    mileage: 26000,
    engine: "1.6 T-GDI 150KM",
    year: 2021,
    childSeat: true,
    description: "Mocny i przestronny SUV na każdą okazję.",
  },
  {
    id: 25,
    name: "Toyota RAV4",
    segment: "Klasa D",
    type: "SUV",
    image:
      "https://i.wpimg.pl/1280x/m.autokult.pl/toyota-rav4-pug-in-1-ee3a4943202.jpg",
    price: 750,
    features: ["Kamera 360", "Bluetooth", "System multimedialny"],
    mileage: 32000,
    engine: "2.5 Hybrid 218KM",
    year: 2021,
    childSeat: true,
    description: "Hybrydowy SUV z doskonałymi osiągami.",
  },
  {
    id: 26,
    name: "Mazda CX-5",
    segment: "Klasa D",
    type: "SUV",
    image: "https://i.bstr.es/highmotor/2021/01/mazda-cx-5-2021_8.jpg",
    price: 700,
    features: ["Klimatyzacja", "Tempomat", "Apple CarPlay"],
    mileage: 27000,
    engine: "2.0 Skyactiv-G 165KM",
    year: 2021,
    childSeat: true,
    description: "Elegancki SUV z doskonałą jakością wykonania.",
  },
  {
    id: 27,
    name: "BMW X1",
    segment: "Klasa D",
    type: "SUV",
    image: "https://trends.com.pl/wp-content/uploads/BMW-X1-2023-5.jpeg",
    price: 800,
    features: ["Czujniki parkowania", "Klimatyzacja", "System multimedialny"],
    mileage: 23000,
    engine: "2.0d 150KM",
    year: 2022,
    childSeat: true,
    description: "Premium SUV, idealny dla wymagających.",
  },
  {
    id: 28,
    name: "Audi Q3",
    segment: "Klasa D",
    type: "SUV",
    image: "https://cdn.wheel-size.com/automobile/body/audi-q3-2018-2025-1716280372.7106097.jpg",
    price: 850,
    features: ["Klimatyzacja", "Czujniki parkowania", "Apple CarPlay"],
    mileage: 24000,
    engine: "2.0 TDI 150KM",
    year: 2022,
    childSeat: true,
    description: "Luksusowy SUV o sportowym charakterze.",
  },
  {
    id: 29,
    name: "Mercedes-Benz GLA",
    segment: "Klasa D",
    type: "SUV",
    image: "https://www.mercedes-benz.pl/content/dam/hq/passengercars/cars/gla/gla-suv-h247-fl-pi/modeloverview/03-2023/images/mercedes-gla-h247-modeloverview-696x392-03-2023.png",
    price: 900,
    features: ["Panoramiczny dach", "Klimatyzacja", "Tempomat"],
    mileage: 26000,
    engine: "2.0 190KM",
    year: 2021,
    childSeat: true,
    description: "Elegancki i przestronny SUV klasy premium.",
  },
  {
    id: 30,
    name: "Range Rover Evoque",
    segment: "Klasa D",
    type: "SUV",
    image:
      "https://assets.config.landrover.com/lr/l551/k26/model/model_l551_k26_a-rdyn_a-swb_gl.jpg?v=4c6e5",
    price: 950,
    features: ["Klimatyzacja", "Czujniki parkowania", "Apple CarPlay"],
    mileage: 29000,
    engine: "2.0 TD4 180KM",
    year: 2021,
    childSeat: true,
    description: "Luksusowy SUV o wyjątkowym stylu.",
  },
  {
    id: 31,
    name: "Ford Mondeo",
    segment: "Klasa E",
    type: "sedan",
    image:
      "https://p.turbosquid.com/ts-thumb/9P/mjWy73/1x/ford_mondeo_sedan_stline_2021_0000/jpg/1683489624/600x600/fit_q87/fa54f0228ce68967a5461f7f0c5eecf611c5a4c6/ford_mondeo_sedan_stline_2021_0000.jpg",
    price: 1000,
    features: ["Klimatyzacja", "Bluetooth", "Czujniki parkowania"],
    mileage: 40000,
    engine: "2.0 TDCi 180KM",
    year: 2021,
    childSeat: true,
    description: "Elegancki sedan o wysokim komforcie jazdy.",
  },
  {
    id: 32,
    name: "Volkswagen Passat",
    segment: "Klasa E",
    type: "sedan",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2021-volkswagen-passat-mmp-1-1597868992.jpg?crop=0.785xw:0.663xh;0.160xw,0.298xh&resize=1200:*",
    price: 1050,
    features: ["Klimatyzacja", "Tempomat", "System multimedialny"],
    mileage: 38000,
    engine: "2.0 TDI 150KM",
    year: 2021,
    childSeat: true,
    description: "Komfortowy sedan dla wymagających.",
  },
  {
    id: 33,
    name: "Mercedes-Benz E-Class",
    segment: "Klasa E",
    type: "sedan",
    image:
      "https://img.chceauto.pl/mercedes-benz/e-klasa/mercedes-benz-e-klasa-sedan-4377-47916_head.jpg",
    price: 1200,
    features: ["Klimatyzacja", "Czujniki parkowania", "System multimedialny"],
    mileage: 35000,
    engine: "2.0 194KM",
    year: 2021,
    childSeat: true,
    description: "Luksusowy sedan o wyjątkowych osiągach.",
  },
  {
    id: 34,
    name: "BMW 5 Series",
    segment: "Klasa E",
    type: "sedan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMFnd7fMdPHMakIzVWUEWioS7DLBX5feankA&s",
    price: 1300,
    features: ["Klimatyzacja", "Tempomat", "Apple CarPlay"],
    mileage: 40000,
    engine: "2.0 190KM",
    year: 2021,
    childSeat: true,
    description: "Elegancki sedan o sportowym charakterze.",
  },
  {
    id: 35,
    name: "Audi A6",
    segment: "Klasa E",
    type: "sedan",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2021-audi-a6-mmp-1-1592325879.jpg",
    price: 1350,
    features: ["Klimatyzacja", "Czujniki parkowania", "Android Auto"],
    mileage: 37000,
    engine: "2.0 TDI 190KM",
    year: 2021,
    childSeat: true,
    description: "Luksusowy sedan z przestronnym wnętrzem.",
  },
  {
    id: 36,
    name: "Jaguar XF",
    segment: "Klasa E",
    type: "sedan",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2021-jaguar-xf-mmp-1-1602092967.jpg?crop=0.848xw:0.711xh;0.0849xw,0.239xh&resize=2048:*",
    price: 1400,
    features: ["Czujniki parkowania", "Klimatyzacja", "Tempomat"],
    mileage: 33000,
    engine: "2.0 Diesel 180KM",
    year: 2021,
    childSeat: true,
    description: "Luksusowy sedan o dynamicznym napędzie.",
  },
  {
    id: 37,
    name: "Lexus ES",
    segment: "Klasa E",
    type: "sedan",
    image:
      "https://images.ctfassets.net/cf4cfgg1xs03/4O8G9xojR6rSLjXtaS23L1/ad23b365be5c603cf7dbb65a078afd91/240301_ES_FullD.webp",
    price: 1500,
    features: ["Czujniki parkowania", "Klimatyzacja", "System multimedialny"],
    mileage: 28000,
    engine: "2.5 Hybrid 218KM",
    year: 2021,
    childSeat: true,
    description: "Luksusowy sedan hybrydowy z doskonałym komfortem.",
  },
  {
    id: 38,
    name: "Tesla Model 3",
    segment: "Klasa F",
    type: "sedan",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2022-tesla-model-3-mmp-1-1640025520.jpg?crop=0.755xw:0.637xh;0.106xw,0.159xh&resize=2048:*",
    price: 2500,
    features: ["Autopilot", "Klimatyzacja", "System multimedialny"],
    mileage: 25000,
    engine: "Electric 283KM",
    year: 2022,
    childSeat: true,
    description: "Nowoczesny elektryczny sedan o niesamowitych osiągach.",
  },
  {
    id: 39,
    name: "Porsche Panamera",
    segment: "Klasa F",
    type: "sedan",
    image:
      "https://porsche-krakow.pl/wp-content/uploads/2022/11/DNG_V9A7132r.jpg",
    price: 3000,
    features: ["Czujniki parkowania", "Klimatyzacja", "Apple CarPlay"],
    mileage: 15000,
    engine: "3.0 V6 330KM",
    year: 2022,
    childSeat: true,
    description: "Luksusowy sedan z wyczynowym charakterem.",
  },
  {
    id: 40,
    name: "BMW 7 Series",
    segment: "Klasa F",
    type: "sedan",
    image:
      "https://motofilm.pl/wp-content/uploads/2020/12/bmw-serii-7-2022-rendering_przod.jpg",
    price: 3500,
    features: ["System multimedialny", "Czujniki parkowania", "Klimatyzacja"],
    mileage: 20000,
    engine: "3.0 320KM",
    year: 2022,
    childSeat: true,
    description: "Luksusowy sedan klasy premium z niesamowitym komfortem.",
  },
  {
    id: 41,
    name: "Rolls-Royce Phantom",
    segment: "Klasa G",
    type: "sedan",
    image:
      "https://fleets.prestige.cars/fleets/db3fd4a4-6118-4a26-b1d3-f818c726686a/Phantom_SWB_a9af46df7046_1c607c976116_lg.jpg",
    price: 10000,
    features: ["Skórzana tapicerka", "Czujniki parkowania", "Klimatyzacja"],
    mileage: 10000,
    engine: "6.75 V12 563KM",
    year: 2022,
    childSeat: true,
    description: "Symbol luksusu i prestiżu w motoryzacji.",
  },
  {
    id: 42,
    name: "Bentley Continental GT",
    segment: "Klasa G",
    type: "coupe",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2022-bentley-continental-gt-speed-128-1620193617.jpg?crop=0.675xw:0.493xh;0.162xw,0.257xh&resize=1200:*",
    price: 12000,
    features: [
      "Skórzana tapicerka",
      "System multimedialny",
      "Czujniki parkowania",
    ],
    mileage: 5000,
    engine: "6.0 W12 626KM",
    year: 2022,
    childSeat: true,
    description: "Wielki luksus w najpiękniejszej formie.",
  },
  {
    id: 43,
    name: "Aston Martin DB11",
    segment: "Klasa G",
    type: "coupe",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0GZWa10DWzFUe3V-gLf8gcw3Es2IMQwiwog&s",
    price: 15000,
    features: ["Skórzana tapicerka", "System multimedialny", "Klimatyzacja"],
    mileage: 8000,
    engine: "5.2 V12 600KM",
    year: 2022,
    childSeat: false,
    description: "Exclusywny supersamochód łączący piękno i wydajność.",
  },
  {
    id: 44,
    name: "Ferrari Roma",
    segment: "Klasa G",
    type: "coupe",
    image:
      "https://www.motortrend.com/uploads/2022/07/2022-Ferrari-Roma-40.jpg",
    price: 20000,
    features: ["Skórzana tapicerka", "Tempomat", "System multimedialny"],
    mileage: 6000,
    engine: "3.9 V8 620KM",
    year: 2022,
    childSeat: false,
    description: "Bardzo szybki i elegancki samochód sportowy.",
  },
  {
    id: 45,
    name: "McLaren GT",
    segment: "Klasa G",
    type: "coupe",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/medium-11116-mclarengt-1633551896.jpg?crop=0.902xw:0.859xh;0.0497xw,0.141xh&resize=2048:*",
    price: 25000,
    features: ["Skórzana tapicerka", "Tempomat", "Klimatyzacja"],
    mileage: 4000,
    engine: "4.0 V8 620KM",
    year: 2022,
    childSeat: false,
    description: "Supersamochód o niepowtarzalnej mocy i komforcie.",
  },
  {
    id: 46,
    name: "Lamborghini Huracan",
    segment: "Klasa G",
    type: "coupe",
    image:
      "https://autogaleria.pl/img/712/400/fit/content/uploads/2022/04/2022-Lamborghini-Huracan-Tecnica-1.jpeg",
    price: 30000,
    features: [
      "Skórzana tapicerka",
      "Czujniki parkowania",
      "System multimedialny",
    ],
    mileage: 3000,
    engine: "5.2 V10 640KM",
    year: 2022,
    childSeat: false,
    description: "Piekielnie szybki supersamochód o niezrównanej mocy.",
  },
  {
    id: 47,
    name: "Bugatti Chiron",
    segment: "Klasa G",
    type: "coupe",
    image:
      "https://www.motortrend.com/uploads/2022/01/2022-Bugatti-Chiron-Super-Sport-65.jpg",
    price: 35000,
    features: ["Skórzana tapicerka", "Klimatyzacja", "Czujniki parkowania"],
    mileage: 2000,
    engine: "8.0 W16 1500KM",
    year: 2022,
    childSeat: false,
    description: "Najpotężniejszy samochód na świecie.",
  },
  {
    id: 48,
    name: "Pagani Huayra",
    segment: "Klasa G",
    type: "coupe",
    image:
      "https://spots.ag/2022/07/10/pagani-huayra-roadster-c953810072022185836_1.jpg?1657472349",
    price: 40000,
    features: ["Skórzana tapicerka", "System multimedialny", "Klimatyzacja"],
    mileage: 1000,
    engine: "6.0 V12 730KM",
    year: 2022,
    childSeat: false,
    description: "Unikalny supersamochód w wersji limitowanej.",
  },
  {
    id: 49,
    name: "Koenigsegg Jesko",
    segment: "Klasa G",
    type: "coupe",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE6LSzlKvcTVLuH9MW70heUlM_QI65GFOcnA&s",
    price: 45000,
    features: ["Skórzana tapicerka", "Klimatyzacja", "Czujniki parkowania"],
    mileage: 500,
    engine: "5.0 V8 1600KM",
    year: 2022,
    childSeat: false,
    description: "Supersamochód nowej generacji.",
  },
  {
    id: 50,
    name: "McLaren Speedtail",
    segment: "Klasa G",
    type: "coupe",
    image:
      "https://spots.ag/2022/03/15/mclaren-speedtail-c110915032022185748_1.jpg?1647367111",
    price: 50000,
    features: [
      "Skórzana tapicerka",
      "Czujniki parkowania",
      "System multimedialny",
    ],
    mileage: 300,
    engine: "4.0 V8 Hybrid 1050KM",
    year: 2022,
    childSeat: false,
    description: "Rewolucyjny supersamochód o niesamowitej prędkości.",
  },
];

let reservations = [];
let reservationHistory = [];

// Konfiguracja nodemailera
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Funkcja wysyłająca maila
function sendDecisionEmail(email, name, carName, action) {
  const subject =
    action === "accept" ? "Rezerwacja zatwierdzona" : "Rezerwacja odrzucona";
  const text =
    action === "accept"
      ? `Dzień dobry ${name},\n\nTwoja rezerwacja samochodu ${carName} została zaakceptowana.`
      : `Dzień dobry ${name},\n\nNiestety nie możemy zrealizować Twojej rezerwacji samochodu ${carName}.`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Błąd przy wysyłce maila:", error);
    }
    console.log("Email wysłany:", info.response);
  });
}

// ENDPOINTY

app.get("/api/cars", (req, res) => {
  res.json(cars);
});

app.get("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find((c) => c.id === id);
  if (!car) return res.status(404).send("Nie znaleziono auta");
  res.json(car);
});

app.post("/api/cars", (req, res) => {
  const newCar = {
    ...req.body,
    id: cars.length > 0 ? cars[cars.length - 1].id + 1 : 1,
  };
  cars.push(newCar);
  res.status(201).json({ message: "Samochód dodany", car: newCar });
});

app.put("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex((c) => c.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Nie znaleziono auta" });

  cars[index] = { ...cars[index], ...req.body };
  res.status(200).json({ message: "Zaktualizowano samochód" });
});

app.delete("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex((c) => c.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Nie znaleziono auta" });

  cars.splice(index, 1);
  res.status(200).json({ message: "Samochód usunięty" });
});

app.post("/api/reservations", (req, res) => {
  const reservation = { ...req.body, timestamp: new Date().toISOString() };
  reservations.push(reservation);
  res.status(201).json({ message: "Zarejestrowano zapytanie" });
});

app.get("/api/reservations", (req, res) => {
  res.json(reservations);
});

app.post("/api/reservations/archive", (req, res) => {
  const { action, originalTimestamp, ...rest } = req.body;

  reservationHistory.push({
    ...rest,
    action,
    timestamp: new Date().toISOString(),
  });

  reservations = reservations.filter((r) => r.timestamp !== originalTimestamp);

  sendDecisionEmail(rest.email, rest.name, rest.carName, action);

  res.status(200).json({ message: "Zarchiwizowano i wysłano e-mail" });
});

app.get("/api/reservations/history", (req, res) => {
<<<<<<< HEAD
  res.json(reservationHistory);
});

=======
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.warn('Brak tokenu JWT');
    return res.status(401).json({ message: "Brak tokenu JWT" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    console.log('Dostęp do historii – JWT OK:', decoded);
    res.json(reservationHistory); // tu zwracamy faktyczną historię
  } catch (err) {
    console.warn('Niepoprawny JWT w historii:', err.message);
    return res.status(403).json({ message: "Nieprawidłowy token JWT" });
  }
});


>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
app.delete("/api/reservations/history/:timestamp", (req, res) => {
  const timestamp = req.params.timestamp;
  reservationHistory = reservationHistory.filter(
    (r) => r.timestamp !== timestamp
  );
  res.status(200).json({ message: "Usunięto z historii" });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message, captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ message: "Brak tokenu CAPTCHA" });
  }

  try {
    const captchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: captchaToken,
        },
      }
    );

    if (!captchaRes.data.success) {
      return res.status(403).json({ message: "Błędna weryfikacja CAPTCHA" });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Nowa wiadomość kontaktowa od ${name}`,
      text: `
Imię i nazwisko: ${name}
Email: ${email}
Telefon: ${phone}

Wiadomość:
${message}
      `,
      replyTo: email,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Błąd przy wysyłce formularza kontaktowego:", error);
        return res
          .status(500)
          .json({ message: "Błąd przy wysyłce wiadomości" });
      }
      console.log("Wiadomość kontaktowa wysłana:", info.response);
      res.status(200).json({ message: "Wiadomość wysłana pomyślnie" });
    });
  } catch (err) {
    console.error("Błąd weryfikacji CAPTCHA:", err);
    return res.status(500).json({ message: "Błąd weryfikacji CAPTCHA" });
  }
});

// Start serwera
<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
=======
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("🚗 MBM Rent backend is running.");
});
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)

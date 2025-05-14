export interface Car {
  id: number;
  name: string;
  segment: CarSegment;
  type: CarType;
  image: string;
  price: number;
  features: string[];
  mileage: number;
  engine: string;
  year: number;
  childSeat: boolean;
  description: string;
}

export type CarSegment = 'Klasa A' | 'Klasa B' | 'Klasa C' | 'Klasa D'| 'Klasa E'| 'Klasa F'| 'Klasa J';
export type CarType = 'hatchback' | 'sedan' | 'kombi' | 'SUV' |'crossover';

export interface User {
  id: string;
  email: string;
  companyName?: string;
  isBusinessAccount: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  carId?: number;
}
import React from 'react';
import { Shield, Clock, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">O nas</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <p className="text-lg mb-6">
          Jesteśmy profesjonalną wypożyczalnią samochodów z wieloletnim doświadczeniem.
          Nasza flota składa się z najwyższej jakości pojazdów różnych segmentów,
          aby spełnić oczekiwania nawet najbardziej wymagających klientów.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bezpieczeństwo</h3>
            <p className="text-gray-600">
              Wszystkie nasze samochody przechodzą regularne przeglądy techniczne
            </p>
          </div>

          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Elastyczność</h3>
            <p className="text-gray-600">
              Dostosowujemy się do potrzeb naszych klientów
            </p>
          </div>

          <div className="text-center">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Jakość</h3>
            <p className="text-gray-600">
              Oferujemy tylko sprawdzone i zadbane samochody
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Dlaczego my?</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
            <span>Konkurencyjne ceny i przejrzyste warunki wynajmu</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
            <span>Szeroki wybór samochodów różnych segmentów</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
            <span>Profesjonalna obsługa i wsparcie techniczne</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
            <span>Możliwość wynajmu długoterminowego dla firm</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
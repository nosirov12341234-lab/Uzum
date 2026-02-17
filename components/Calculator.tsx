
import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [rate, setRate] = useState<string>('3.5');

  const calculateCBM = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    return (l * w * h) / 1000000; // Assuming cm input
  };

  const cbm = calculateCBM();
  const totalCost = (parseFloat(weight) || 0) * (parseFloat(rate) || 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="p-2 bg-yellow-100 rounded-lg text-yellow-600">🧮</span>
        Logistika Kalkulyatori
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Og'irlik (kg)</label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Masalan: 50"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Uzun (cm)</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Eni (cm)</label>
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bo'yi (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Narx ($ / kg)</label>
          <input 
            type="number" 
            value={rate} 
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="3.5"
          />
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-xl space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Hajm (CBM):</span>
            <span className="font-semibold">{cbm.toFixed(4)} m³</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-purple-700 pt-2 border-t border-purple-100">
            <span>Taxminiy narx:</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

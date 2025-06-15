import React from 'react';

export default function NeighborIsla({ neighbors }) { // Modificar este objeto y como se lee
  return (
    <div className="p-4 bg-blue-50 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">Países Vecinos</h3>
      {neighbors && neighbors.length > 0 ? (
        <ul className="flex flex-wrap gap-3">
          {neighbors.map((n) => (
            <li key={n.code} className="border p-2 rounded hover:bg-blue-100 cursor-pointer">
              <a href={`/countries/${n.slug}`} className="flex items-center gap-2">
                <img src={n.flag} alt={`Bandera de ${n.name}`} className="w-6 h-4 object-cover" />
                <span>{n.name}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tiene países vecinos.</p>
      )}
    </div>
  );
}

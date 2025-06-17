import React from 'react';

export default function NeighborIsla({ neighbors }) {
  return (
    <div className="p-3 bg-light rounded shadow-sm">
      <h3 className="h5 mb-3">Países Vecinos</h3>
      {neighbors && neighbors.length > 0 ? (
        <ul className="list-unstyled d-flex flex-wrap gap-2">
          {neighbors.map(({ code, slug, name, flag }) => (
            <li key={code} className="border rounded p-2">
              <a href={`/countries/${slug}`} className="d-flex align-items-center text-decoration-none gap-2">
                <img src={flag} alt={`Bandera de ${name}`} className="img-fluid" style={{ width: '24px', height: '16px', objectFit: 'cover' }} />
                <strong className="ms-2">{name}</strong>
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

import fs from 'fs/promises';
import path from 'path';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca3,capital,flags,region,population,borders,languages,maps,latlng';
const OUTPUT_DIR = '../city-pages/src/content/countries';

async function main() {
  const res = await fetch(API_URL);
  const countries = await res.json();
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  for (const country of countries) {
    const name = country.name.common;
    const slug = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    const filePath = path.join(OUTPUT_DIR, `${slug}.json`);

    const data = {
      slug,
      code: country.cca3.toLowerCase(),
      name: country.name.common,
      capital: country.capital[0],
      flag: country.flags?.png || '',
      region: country.region,
      population: country.population,
      borders: country.borders || [],
      languages: Object.values(country.languages),
      maps: Object.values(country.maps),
      latlng: country.latlng,
    };


    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  console.log(`Se generaron ${countries.length} archivos JSON en ${OUTPUT_DIR}`);
}

main().catch(err => {
  console.error('Error al generar archivos:', err);
});

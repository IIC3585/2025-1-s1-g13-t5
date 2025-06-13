import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca3,capital,flags,region,population,borders';
const OUTPUT_DIR = './src/content/countries';

async function main() {
  const res = await fetch(API_URL);
  const countries = await res.json();
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  for (const country of countries) {
    const name = country.name.common;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const filePath = path.join(OUTPUT_DIR, `${slug}.json`);

    const data = {
      code: country.cca3.toLowerCase(),
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'Desconocida',
      flag: country.flags?.png || '',
      region: country.region,
      population: country.population
    };

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  console.log(`Se generaron ${countries.length} archivos JSON en ${OUTPUT_DIR}`);
}

main().catch(err => {
  console.error('Error al generar archivos:', err);
});

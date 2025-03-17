const data = `city,population,area,density,country
Shanghai,24256800,6340,3826,China
Delhi,16787941,1484,11313,India
Lagos,16060303,1171,13712,Nigeria
Istanbul,14160467,5461,2593,Turkey
Tokyo,13513734,2191,6168,Japan
Sao Paulo,12038175,1521,7914,Brazil
Mexico City,8874724,1486,5974,Mexico
London,8673713,1572,5431,United Kingdom
New York City,8537673,784,10892,United States
Bangkok,8280925,1569,5279,Thailand`;

const parseData = (data) => {
  if (!data) return [];

  const lines = data.split('\n');
  const headers = lines[0].split(',');
  if (!lines.at(-1).trim()) lines.pop();
  const dataLines = lines.slice(1);

  return dataLines.map(line => {
    const cells = line.split(',');
    const item = {};

    headers.forEach((header, index) => {
      item[header] = cells[index];
    });

    return item;
  });
};

const processData = (data) => {
  const cities = parseData(data);
  if (cities.length === 0) return;

  const maxDensity = Math.max(...cities.map((city) => city.density));

  cities
    .map((city) => {
      city.relativeDensity = Math.round((parseInt(city.density) * 100) / maxDensity);
      return city;
    })
    .toSorted((r1, r2) => r2.relativeDensity - r1.relativeDensity)
    .forEach((city) => {
      console.log(
        ''
        + city.city.padEnd(18)
        + city.population.toString().padStart(10)
        + city.area.toString().padStart(8)
        + city.density.toString().padStart(8)
        + city.country.padStart(18)
        + city.relativeDensity.toString().padStart(6)
      );
    });
};

processData(data);

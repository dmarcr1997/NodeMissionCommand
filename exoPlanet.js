const { parse } = require('csv-parse');
const { createReadStream } = require('fs');

const results = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === "CONFIRMED" 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 
        && planet['koi_prad'] < 1.6;
}

createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if(isHabitablePlanet(data))
            results.push(data);
    })
    .on('error', (err) => console.error(err))
    .on('end', () => {
        console.log(`🚀${results.length} Habitable Planets Found`)
        console.log(results.map((planet) => {
            return planet['kepler_name'];
        }));
    });
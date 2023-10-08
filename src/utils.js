import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const dataPath = `${__dirname}`.concat('/data/data.json');
export const carrosPath = `${__dirname}`.concat('/data/carros.json');

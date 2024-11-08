import dotenv from 'dotenv';
const parsedConfig = dotenv.config();

export const config = parsedConfig.parsed;

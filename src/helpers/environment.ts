import { Environments } from '../enums/environments.enum';

const env = process.env.NODE_ENV;

export const isDevelopment = () => env === Environments.development;

export const isStaging = () => env === Environments.staging;

export const isProd = () => env === Environments.production;

export const enironment = env;

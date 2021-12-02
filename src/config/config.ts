import { Client, ClientConfig } from 'pg';

interface IAppConfig {
  pgClient: Client;
  baseUrl: string;
}
const createTableText = `
CREATE  TABLE if not exists urls(
  ID  SERIAL PRIMARY KEY,
  session varchar(50),
  views integer,
  url varchar(200),
  shorturl varchar(50)
);
`;
/**
 * service provides initial configuration
 */
export const config = async (): Promise<IAppConfig> => {
  const options: ClientConfig = {
    host: process.env.PGHOST ?? 'localhost',
    port: +process.env.PGPORT ?? 5432,
    password: process.env.PGPASSWORD ?? 'password',
    user: process.env.PGUSER ?? 'postgres',
  };
  // settings for heroku deployment
  if (process.env.PGDATABASE) {
    options['database'] = process.env.PGDATABASE;
    options['ssl'] = { rejectUnauthorized: false };
  }
  const client = new Client(options);
  await client.connect();
  await client.query(createTableText);

  return {
    pgClient: client,
    baseUrl: 'https://tier.app',
  };
};

import { Client } from 'pg';

interface IAppConfig{
    pgClient: Client,
    baseUrl: string
}
const createTableText = `
CREATE  TABLE if not exists urls(
  ID  SERIAL PRIMARY KEY,
  session varchar(50),
  views integer,
  url varchar(200),
  shorturl varchar(50)
);
`

export const config = async ():Promise<IAppConfig> => {
    const options = {
      host: process.env.PGHOST ?? 'localhost',
      port: +process.env.PGPORT ?? 5432,
      password: process.env.PGPASSWORD ?? 'password',
      user: process.env.PGUSER ?? 'postgres',
  }
  process.env.PGDATABASE && (options['database'] = process.env.PGDATABASE)

    const client = new Client(options)
    await client.connect()
    await client.query(createTableText)
    
    return {
        pgClient: client,
        baseUrl: 'https://tier.app'
  }
};
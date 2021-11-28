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
    const client = new Client({
        host: process.env.DB_HOST ?? 'localhost',
        port: +process.env.DB_PORT ?? 5432,
        password: process.env.DB_PASS ?? 'password',
        user: process.env.DB_USER ?? 'postgres'
    })
    await client.connect()
    await client.query(createTableText)
    
    return {
        pgClient: client,
        baseUrl: 'https://tier.app'
  }
};
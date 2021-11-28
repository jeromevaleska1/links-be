import { Client } from 'pg';
interface IAppConfig {
    pgClient: Client;
    baseUrl: string;
}
export declare const config: () => Promise<IAppConfig>;
export {};

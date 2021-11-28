"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const pg_1 = require("pg");
const createTableText = `
CREATE  TABLE if not exists urls(
  ID  SERIAL PRIMARY KEY,
  session varchar(50),
  views integer,
  url varchar(200),
  shorturl varchar(50)
);
`;
const config = async () => {
    var _a, _b, _c, _d;
    const options = {
        host: (_a = process.env.PGHOST) !== null && _a !== void 0 ? _a : 'localhost',
        port: (_b = +process.env.PGPORT) !== null && _b !== void 0 ? _b : 5432,
        password: (_c = process.env.PGPASSWORD) !== null && _c !== void 0 ? _c : 'password',
        user: (_d = process.env.PGUSER) !== null && _d !== void 0 ? _d : 'postgres',
    };
    if (process.env.PGDATABASE) {
        options['database'] = process.env.PGDATABASE;
        options['ssl'] = true;
    }
    const client = new pg_1.Client({ connectionString: 'postgres://fimorldtmnsotx:6f2346548a6e49b1a25f39ba0de86def8dd7e20f13fba6db03378536f47016e9@ec2-34-242-89-204.eu-west-1.compute.amazonaws.com:5432/d6rr6f60lk8nl9',
        ssl: {
            rejectUnauthorized: false
        } });
    await client.connect();
    await client.query(createTableText);
    return {
        pgClient: client,
        baseUrl: 'https://tier.app'
    };
};
exports.config = config;
//# sourceMappingURL=config.js.map
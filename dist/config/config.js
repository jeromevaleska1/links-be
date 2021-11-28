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
    const client = new pg_1.Client({
        host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : 'localhost',
        port: (_b = +process.env.DB_PORT) !== null && _b !== void 0 ? _b : 5432,
        password: (_c = process.env.DB_PASS) !== null && _c !== void 0 ? _c : 'password',
        user: (_d = process.env.DB_USER) !== null && _d !== void 0 ? _d : 'postgres'
    });
    await client.connect();
    await client.query(createTableText);
    return {
        pgClient: client,
        baseUrl: 'https://tier.app'
    };
};
exports.config = config;
//# sourceMappingURL=config.js.map
require("dotenv").config();
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "elextra",
  password: "P@ssw0rd",
  port: 5432,
});

export default pool;

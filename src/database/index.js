import Knex from "knex";
import knexfile from "../../knexfile";

const knex = Knex(knexfile.development);

export default knex;

import { sql } from "../database/database.js";

const findLastFive = async () => {
    return await sql`select * from messages order by id desc limit 5 `;
};

const sendMsg = async (sender, message) => {
    await sql`insert into messages (sender, message) values (${sender}, ${message})`;
};

export { findLastFive, sendMsg };
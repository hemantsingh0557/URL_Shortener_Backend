import { createClient } from "redis";
import config from "./index.js" ;


const client = createClient({
    username: config.redis.username || "default",
    password: config.redis.password,
    socket: {
        host: config.redis.host,
        port: config.redis.port ,
    },
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

await client.set("foo", "bar");
const result = await client.get("foo");
console.log(result); 


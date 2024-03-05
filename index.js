require("dotenv").config();
const Fastify = require("fastify");
const fastifyMysql = require("@fastify/mysql");
let homeController = require("./routes/home.route");
let shopController = require("./routes/shop.route");
let customerController = require("./routes/customer.route");
let cors = require("@fastify/cors");

// Require the framework and instantiate it
const fastify = Fastify({ logger: true });

// database connected
fastify.register(fastifyMysql, {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  promise: true,
});

fastify.register(cors);

fastify.register(homeController, { prefix: "/Home" });
fastify.register(shopController, { prefix: "/Shop" });
fastify.register(customerController, { prefix: "/Customer" });

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3002 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

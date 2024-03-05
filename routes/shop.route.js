require("dotenv").config();
function shopController(fastify, Option, done) {
  fastify.get("/", async (request, reply) => {
    try {
      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        `SELECT * FROM shop ORDER BY shopId`
      );
      //   disconnect database
      connection.release();
      const result = {
        success: true,
        message: "Success",
        result: rows,
      };
      return result;
    } catch (err) {
      const result = {
        success: false,
        message: err.message,
        result: null,
      };
      return result;
    }
  });

  fastify.get("/:id", async (request, reply) => {
    try {
      let id = request.params.id;
      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        `SELECT * FROM shop WHERE shopId = '${id}'`
      );
      //   disconnect database
      connection.release();
      const result = {
        success: true,
        message: "Success",
        result: rows,
      };
      return result;
    } catch (err) {
      const result = {
        success: false,
        message: err.message,
        result: null,
      };
      return result;
    }
  });

  fastify.post("/Create", async (request, reply) => {
    try {
      let shopId = request.body.shopId;
      let shopName = request.body.shopName;
      // console.log("request.body", request.body);

      let values = `INSERT INTO shop (shopId,shopName) VALUES ('${shopId}','${shopName}');`;
      // console.log(values);

      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(values);
      //   disconnect database
      connection.release();
      const result = {
        success: true,
        message: "Success",
        result: [],
      };
      return result;
    } catch (err) {
      const result = {
        success: false,
        message: err.message,
        result: null,
      };
      return result;
    }
  });

  fastify.post("/Update", async (request, reply) => {
    try {
      let shopId = request.body.shopId;
      let shopName = request.body.shopName;
      // console.log("request.body", request.body);

      let values = `UPDATE shop SET shopName = '${shopName}' WHERE shopId = '${shopId}';`;
      // console.log(values);

      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(values);
      //   disconnect database
      connection.release();
      const result = {
        success: true,
        message: "Success",
        result: [],
      };
      return result;
    } catch (err) {
      const result = {
        success: false,
        message: err.message,
        result: null,
      };
      return result;
    }
  });

  fastify.post("/Delete", async (request, reply) => {
    try {
      let shopId = request.body.shopId;
      let shopName = request.body.shopName;
      // console.log("request.body", request.body);

      let values = `DELETE FROM shop WHERE shopId = '${shopId}';`;
      // console.log(values);

      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(values);
      //   disconnect database
      connection.release();
      const result = {
        success: true,
        message: "Success",
        result: [],
      };
      return result;
    } catch (err) {
      const result = {
        success: false,
        message: err.message,
        result: null,
      };
      return result;
    }
  });

  done();
}

module.exports = shopController;

require("dotenv").config();
function customerController(fastify, Option, done) {
  fastify.get("/", async (request, reply) => {
    try {
      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        `SELECT * FROM customer ORDER BY custId`
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
        `SELECT * FROM customer WHERE custId = '${id}'`
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
      let custId = request.body.custId;
      let firstName = request.body.firstName;
      let lastName = request.body.lastName;
      let phone = request.body.phone;
      // console.log("request.body", request.body);

      let values = `INSERT INTO customer (custId,firstName,lastName,phone)
      VALUES ('${custId}','${firstName}','${lastName}','${phone}')`;
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
      let custId = request.body.custId;
      let firstName = request.body.firstName;
      let lastName = request.body.lastName;
      let phone = request.body.phone;
      // console.log("request.body", request.body);

      let values = `UPDATE customer SET firstName='${firstName}',lastName='${lastName}',phone='${phone}'
      WHERE custId = '${custId}';`;
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
      let custId = request.body.custId;

      // console.log("request.body", request.body);

      let values = `DELETE FROM customer WHERE custId = '${custId}';`;
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

module.exports = customerController;

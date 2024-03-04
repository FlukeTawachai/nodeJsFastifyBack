require("dotenv").config();
const crypto = require("crypto");

function homeController(fastify, Option, done) {
  fastify.get("/", async (request, reply) => {
    try {
      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        `SELECT * FROM tb_m_home WHERE cSTATUS = 'Y'`
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
  fastify.get("/:project/:id", async (request, reply) => {
    try {
      let project = request.params.project;
      let id = request.params.id;
      const connection = await fastify.mysql.getConnection();
      const [rows, fields] = await connection.query(
        `SELECT * FROM tb_m_home WHERE cPROJ_CODE = '${project}' AND cADDR_NO = '${id}'`
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
      let cGUID = `${crypto.randomUUID()}`;
      let dateTime = new Date().toJSON();
      let cPROJ_CODE = request.body.cPROJ_CODE;
      let cADDR_NO = request.body.cADDR_NO;
      let iNO_OF_CAR = request.body.iNO_OF_CAR;
      let cSTATUS = "Y";
      let cCREATE_BY = request.body.cCREATE_BY;
      // console.log("request.body", request.body);

      let values = `INSERT INTO tb_m_home 
      (cGUID,cPROJ_CODE,cADDR_NO,iNO_OF_CAR,cSTATUS,dCREATE_DATE,cCREATE_BY,dUPDATE_DATE,cUPDATE_BY)
      VALUE ('${cGUID}','${cPROJ_CODE}','${cADDR_NO}',${iNO_OF_CAR},'${cSTATUS}',NOW(),'${cCREATE_BY}',NOW(),'${cCREATE_BY}')`;
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
    try {;
      let cPROJ_CODE = request.body.cPROJ_CODE;
      let cADDR_NO = request.body.cADDR_NO;
      let iNO_OF_CAR = request.body.iNO_OF_CAR;
      let cSTATUS = request.body.cSTATUS;
      let cCREATE_BY = request.body.cCREATE_BY;
      // console.log("request.body", request.body);

      let values = `UPDATE tb_m_home 
      SET iNO_OF_CAR = '${iNO_OF_CAR}', cSTATUS = '${cSTATUS}', dUPDATE_DATE = NOW(), cUPDATE_BY = '${cCREATE_BY}'
      WHERE cPROJ_CODE = '${cPROJ_CODE}' AND cADDR_NO ='${cADDR_NO}'`;
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
      let cPROJ_CODE = request.body.cPROJ_CODE;
      let cADDR_NO = request.body.cADDR_NO;
      // console.log("request.body", request.body);

      let values = `DELETE FROM tb_m_home WHERE cPROJ_CODE = '${cPROJ_CODE}' AND cADDR_NO = '${cADDR_NO}'`;
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

module.exports = homeController;

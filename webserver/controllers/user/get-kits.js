'use strict';

const mySqlPool = require('../../../databases/mysql-pool');


async function getKits(req, res, next) {
  try {
    const connection = await mySqlPool.getConnection();

    const sqlQuery = 'SELECT * FROM kits k INNER JOIN sizes s ON k.size_id = s.size_id ORDER BY k.season';

    const [result] = await connection.query(sqlQuery);

    if (result.length > 0) {
      connection.release();
      return res.status(200).send(result);
    }
    connection.release();
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = getKits;

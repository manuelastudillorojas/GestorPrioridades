const severidadModel = require("../model/severidad.model");

const validaVacio = (datoIngreso) => {
  if (datoIngreso.trim() != "") {
    return true;
  } else {
    return false;
  }
};

const sendJsonStatus = (res, statusCode, msg) => {
  res.status(statusCode).json(msg);
};

const getSeveridad = async (req, res) => {
  try {
    const severidad = await severidadModel.getSeveridad();

    if (severidad.rows.length == 0) {
      sendJsonStatus(res, 200, {
        msg: `No hay registros`,
        tipo: `error`,
      });
    } else {
      sendJsonStatus(res, 200, { datos: severidad.rows });
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message);
  }
};

const getSeveridadById = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const severidad = await severidadModel.getSeveridadById(req.params.id);

      if (severidad.rows.length == 0) {
        sendJsonStatus(res, 200, {
          msg: `No hay  registros con el id ${req.params.id}`,
          tipo: `error`,
        });
      } else {
        sendJsonStatus(res, 200, { datos: severidad.rows });
      }
    } else {
      sendJsonStatus(res, 200, { msg: `Id vacío`, tipo: `error` });
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message);
  }
};

const createSeveridad = async (req, res) => {
  try {
    if (
      validaVacio(req.body.nombre) &&
      validaVacio(req.body.puntos) &&
      validaVacio(req.body.id_criticidad)
    ) {
      const severidad = await severidadModel.createSeveridad(req.body);
      sendJsonStatus(res, 200, {
        msg: {
          info: `Se han ingresado los datos correctamente`,
          datos: severidad.rows,
        },
        tipo: `ok`,
      });
    } else {
      sendJsonStatus(res, 200, {
        msg: `Todos los datos deben contener informacion`,
        tipo: `error`,
      });
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message);
  }
};

const deleteSeveridad = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const severidad = await severidadModel.deleteSeveridad(req.params.id);
      sendJsonStatus(res, 200, {
        msg: `Cantidad de filas eliminadas: ${severidad.rowCount}`,
        tipo: `ok`,
      });
    } else {
      sendJsonStatus(res, 200, { msg: ` no encontrado`, tipo: `error` });
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message);
  }
};

const updateSeveridad = async (req, res) => {
  try {
    if (
      validaVacio(req.params.id) &&
      validaVacio(req.body.nombre) &&
      validaVacio(req.body.puntos) &&
      validaVacio(req.body.id_criticidad)
    ) {
      const severidad = await severidadModel.updateSeveridad(
        req.params.id,
        req.body
      );
      sendJsonStatus(res, 200, {
        msg: `Datos actualizados en ${severidad.rowCount} filas`,
        tipo: `ok`,
      });
    } else {
      sendJsonStatus(res, 200, {
        msg: `Todos los datos deben contener informacion`,
        tipo: `error`,
      });
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message);
  }
};

module.exports = {
  getSeveridad,
  createSeveridad,
  getSeveridadById,
  deleteSeveridad,
  updateSeveridad,
};

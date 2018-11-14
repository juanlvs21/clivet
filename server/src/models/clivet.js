const mysql = require('mysql');
const atob = require('atob');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clivet'
});

let vetModel = {};

// ---------- USUARIOS ----------
vetModel.getUsuario = (usuario, callback) => {
    let decode = atob(usuario, 'base64');
    let user = JSON.parse(decode);

    if (connection) {
        connection.query(
            `SELECT * FROM usuario WHERE usuario=${connection.escape(user.usuario)} AND contra=${connection.escape(user.contra)}`,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.getUsuarios = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM usuario',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.deleteUsuario = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM usuario WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `DELETE FROM usuario WHERE id = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Eliminado"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};

vetModel.insertUsuario = (usuarioData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO usuario SET ?', usuarioData,
            (err, result) => {
                if (err) {
                    console.log("Error al Insertar");
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId //InsertId es lo que se usa en la ruta
                    });
                    console.log("Usuario Insertado");
                }
            }
        )
    }
};

vetModel.updateContra = (usuario, callback) => {
    if (connection) {

        var sql = `UPDATE usuario SET contra = ${connection.escape(usuario.contra)} WHERE id=${connection.escape(usuario.id)}`

        connection.query(sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, { "msg": "Contraseña cambiada" });
            }
        });
    }
}

// ---------- CLIENTES ----------
vetModel.getClientes = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM cliente WHERE eliminado="0"',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.getClientesAdmin = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM cliente WHERE eliminado=1',
            (err, rows) => {
                if (err) {
                    throw err;

                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.deleteClientesAdmin = (callback) => {
    if (connection) {
        let sql = `DELETE FROM cliente WHERE eliminado=1`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    msg: "Eliminado"
                })
            }
        });
    }
};

vetModel.getCliente = (id, callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM cliente WHERE id=${connection.escape(id)} AND eliminado="0"`,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.insertCliente = (clienteData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO cliente SET ?', clienteData,
            (err, result) => {
                if (err) {
                    console.log("Error al Insertar");
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId //InsertId es lo que se usa en la ruta
                    });
                    console.log("Cliente Insertado");
                }
            }
        )
    }
};

vetModel.deleteCliente = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM cliente WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `UPDATE cliente SET eliminado="1" WHERE id = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Eliminado"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};

// ---------- MASCOTAS ----------
vetModel.getMascotas = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM mascota_historia WHERE eliminada="0"',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.getMascotasAdmin = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM mascota_historia WHERE eliminada="1"',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.deleteMascotasAdmin = (callback) => {
    if (connection) {
        let sql = `DELETE FROM mascota_historia WHERE eliminada=1`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    msg: "Eliminado"
                })
            }
        });
    }
};

vetModel.getMascota = (id, callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM mascota_historia WHERE id=${connection.escape(id)} AND eliminada='0'`,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.getMascotasCliente = (id, callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM mascota_historia WHERE id_cliente=${connection.escape(id)} AND eliminada='0'`,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.insertMascota = (mascotaData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO mascota_historia SET ?', mascotaData,
            (err, result) => {
                if (err) {
                    console.log("Error al Insertar");
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId //InsertId es lo que se usa en la ruta
                    });
                    console.log("Mascota Insertada");
                }
            }
        )
    }
};

vetModel.deleteMascota = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM mascota_historia WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `UPDATE mascota_historia SET eliminada="1" WHERE id = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Eliminado"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};

vetModel.deleteMascotaCliente = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM mascota_historia WHERE id_cliente = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `UPDATE mascota_historia SET eliminada="1" WHERE id_cliente = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Eliminado"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};

// ---------- DETALLES ----------
vetModel.getDetalle = (id, callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM detalle_historia WHERE id_historia=${connection.escape(id)} AND eliminado="0"`,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.getDetallesAdmin = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM detalle_historia WHERE eliminado=1',
            (err, rows) => {
                if (err) {
                    throw err;

                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.deleteDetallesAdmin = (callback) => {
    if (connection) {
        let sql = `DELETE FROM detalle_historia WHERE eliminado=1`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    msg: "Eliminado"
                })
            }
        });
    }
};

vetModel.getUnicoDetalle = (id, callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM detalle_historia WHERE id=${connection.escape(id)} AND eliminado="0"`,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.insertDetalle = (detalleData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO detalle_historia SET ?', detalleData,
            (err, result) => {
                if (err) {
                    console.log("Error al Insertar");
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId //InsertId es lo que se usa en la ruta
                    });
                    console.log("Detalle Insertado");
                }
            }
        )
    }
};

vetModel.deleteDetalle = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM detalle_historia WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `UPDATE detalle_historia SET eliminado="1" WHERE id = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Eliminado"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};

vetModel.deleteDetallesCliente = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM detalle_historia WHERE id_historia = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `UPDATE detalle_historia SET eliminada="1" WHERE id_historia = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Eliminado"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};

// ---------- VACUNAS -----------
vetModel.getVacunas = (id, callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM vacuna WHERE id_mascota=${connection.escape(id)} ORDER BY fecha ASC`,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.insertVacuna = (vacunaData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO vacuna SET ?', vacunaData,
            (err, result) => {
                if (err) {
                    console.log("Error al Insertar");
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId //InsertId es lo que se usa en la ruta
                    });
                    console.log("Vacuna Insertado");
                }
            }
        )
    }
};

vetModel.deleteVacuna = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM vacuna WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `DELETE FROM vacuna WHERE id = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Eliminado"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};


// ---------- CONSULTAS ----------
vetModel.getConsultasHistorial = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM consulta WHERE eliminada="0"',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.getConsultasAdmin = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM consulta WHERE eliminada="1"',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.deleteConsultasAdmin = (callback) => {
    if (connection) {
        let sql = `DELETE FROM consulta WHERE eliminada=1`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    msg: "Eliminado"
                })
            }
        });
    }
};

vetModel.getConsultas = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM consulta WHERE finalizada=0 AND eliminada="0"',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.getConsulta = (id, callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM consulta WHERE id=${connection.escape(id)} AND finalizada=0  AND eliminada="0"`,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.getConsultasFecha = (fecha, callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM consulta WHERE fecha=${connection.escape(fecha)} AND finalizada=0  AND eliminada="0" ORDER BY hora ASC`,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

vetModel.insertConsulta = (detalleConsulta, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO consulta SET ?', detalleConsulta,
            (err, result) => {
                if (err) {
                    console.log("Error al Insertar");
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId //InsertId es lo que se usa en la ruta
                    });
                    console.log("Consulta Insertada");
                }
            }
        )
    }
};

vetModel.consultasPasadas = (fecha, callback) => {
    if (connection) {
        let sql = `UPDATE consulta SET finalizada=1 WHERE fecha = ${fecha}`;
        connection.query(sql, (err, result2) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    msg: "Inactivas"
                })
            }
        });
    }
};

vetModel.deleteConsulta = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM consulta WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `UPDATE consulta SET eliminada="1" WHERE id = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Eliminado"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};

vetModel.finalizarConsulta = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM consulta WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `UPDATE consulta SET finalizada=1 WHERE id = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Finalizada"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};

// ---------- MEDICOS ----------
vetModel.getMedicos = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM medico',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

module.exports = vetModel;


// vetModel.deleteCliente = (id, callback) => {
//     if (connection) {
//         const sql = `
//             UPDATE cliente SET
//             eliminado = "1"
//             WHERE id = ${connection.escape(id)}
//         `

//         connection.query(sql, (err, result) => {
//             (err, result) => {
//                 if (err) {
//                     console.log("Error al Eliminar");
//                     throw err;
//                 } else {
//                     callback(null, {
//                         msg: "Cliente Eliminado Correctamente"
//                     });
//                     console.log("Cliente Eliminado Correctamente");
//                 }
//             }
//         })
//     }
// };



// vetModel.deleteCliente = (id, callback) => {
//     if (connection) {
//         let sql = `SELECT * FROM cliente WHERE id = ${connection.escape(id)}`;

//         connection.query(sql, (err, result) => {
//             if (result) {
//                 let sql = `UPDATE cliente SET eliminado="1" WHERE id = ${id}`;

//                 connection.query(sql, (err, result2) => {
//                     if (err) {
//                         throw err;
//                     } else {
//                         callback(null, {
//                             msg: "Eliminado"
//                         })
//                     }
//                 });
//             } else {
//                 callback(err, {
//                     msg: "No existe"
//                 })
//             }
//         })
//     }
// };

/*
compradorModel.deleteComprador = (id, callback) => {
    if (connection) {
        let sql = `SELECT * FROM comprador WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (err, result) => {
            if (result) {
                let sql = `DELETE FROM comprador WHERE id = ${id}`;

                connection.query(sql, (err, result2) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: "Eliminado"
                        })
                    }
                });
            } else {
                callback(err, {
                    msg: "No existe"
                })
            }
        })
    }
};
*/
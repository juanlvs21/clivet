const Vet = require('../models/clivet');

module.exports = function(app) {

    // ---------- USUARIOS -----------

    app.get('/usuario/:usuario', (req, res) => {
        Vet.getUsuario(req.params.usuario, (err, data) => {
            res.json(data);
        })
    });

    app.get('/usuarios', (req, res) => {
        Vet.getUsuarios((err, data) => {
            res.json(data);
        })
    });

    app.delete('/usuarios/:id', (req, res) => {
        Vet.deleteUsuario(req.params.id, (err, data) => {
            if (data && (data.msg === "Eliminado" || data.msg === "No existe")) {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: "Error interno del servidor"
                })
            }
        })
    });

    app.post('/usuario', (req, res) => {
        const usuarioData = {
            ci: req.body.ci,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            contra: req.body.contra,
            tipo: req.body.tipo
        };

        Vet.insertUsuario(usuarioData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Usuario insertado',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error interno del servidor'
                });
            };
        });
    });

    // ---------- CLIENTES ----------
    app.get('/clientes', (req, res) => {
        Vet.getClientes((err, data) => {
            res.json(data);
        })
    });
    
    app.get('/clientes/admin', (req, res) => {
        Vet.getClientesAdmin((err, data) => {
            res.json(data);
        })
    });

    app.delete('/clientes/admin', (req, res) => {
        Vet.deleteClientesAdmin((err, data) => {
            if (data && (data.msg === "Eliminado")) {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: "Error interno del servidor"
                })
            }
        })
    });

    app.get('/clientes/:id', (req, res) => {
        Vet.getCliente(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/clientes', (req, res) => {
        const clienteData = {
            ci: req.body.ci,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            eliminado: "0"
        };

        Vet.insertCliente(clienteData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Cliente insertado',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error interno del servidor'
                });
            };
        });
    });

    app.put('/clientes/eliminar/:id', (req, res) => {
        Vet.deleteCliente(req.params.id, (err, data) => {
            if (data) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: "Error al Eliminar"
                });
            }
        });
    });
    // app.delete('/clientes/:id', (req, res) => {
    //     Vet.deleteCliente(req.params.id, (err, data) => {
    //         if (data && (data.msg === "Eliminado" || data.msg === "No existe")) {
    //             res.json({
    //                 success: true,
    //                 data
    //             })
    //         } else {
    //             res.status(500).json({
    //                 msg: "Error interno del servidor"
    //             })
    //         }
    //     })
    // });
    // ---------- MASCOTAS ----------
    app.get('/mascotas', (req, res) => {
        Vet.getMascotas((err, data) => {
            res.json(data);
        })
    });

    app.get('/mascotas/admin', (req, res) => {
        Vet.getMascotasAdmin((err, data) => {
            res.json(data);
        })
    });

    app.delete('/mascotas/admin', (req, res) => {
        Vet.deleteMascotasAdmin((err, data) => {
            if (data && (data.msg === "Eliminado")) {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: "Error interno del servidor"
                })
            }
        })
    });

    app.get('/mascotas/:id', (req, res) => {
        Vet.getMascota(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/mascotas/cliente/:id', (req, res) => {
        Vet.getMascotasCliente(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/mascotas', (req, res) => {
        const mascotaData = {
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            sexo: req.body.sexo,
            raza: req.body.raza,
            edad: req.body.edad,
            tamano: req.body.tamano,
            peso: req.body.peso,
            descripcion: req.body.descripcion,
            antecedentes: req.body.antecedentes,
            id_cliente: req.body.id_cliente
        };

        Vet.insertMascota(mascotaData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Mascota insertada',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error interno del servidor'
                });
            };
        });
    });

    app.put('/mascota/eliminar/:id', (req, res) => {
        Vet.deleteMascota(req.params.id, (err, data) => {
            if (data) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: "Error al Eliminar"
                });
            }
        });
    });

    app.put('/mascota/eliminar/cliente/:id', (req, res) => {
        Vet.deleteMascotaCliente(req.params.id, (err, data) => {
            if (data) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: "Error al Eliminar"
                });
            }
        });
    });

    // ---------- DETALLES ----------
    app.get('/detalles/:id', (req, res) => {
        Vet.getDetalle(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/detalles/admin', (req, res) => {
        Vet.getDetallesAdmin((err, data) => {
            res.json(data);
        })
    });

    app.delete('/detalles/admin', (req, res) => {
        Vet.deleteDetallesAdmin((err, data) => {
            if (data && (data.msg === "Eliminado")) {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: "Error interno del servidor"
                })
            }
        })
    });

    app.get('/detalle/:id', (req, res) => {
        Vet.getUnicoDetalle(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/detalles', (req, res) => {
        const detalleData = {
            descripcion: req.body.descripcion,
            id_historia: req.body.id_historia
        };

        Vet.insertDetalle(detalleData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Detalle insertado',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error interno del servidor'
                });
            };
        });
    });

    app.put('/detalles/eliminar/:id', (req, res) => {
        Vet.deleteDetalle(req.params.id, (err, data) => {
            if (data) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: "Error al Eliminar"
                });
            }
        });
    });

    app.put('/detalles/eliminar/cliente/:id', (req, res) => {
        Vet.deleteDetallesCliente(req.params.id, (err, data) => {
            if (data) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: "Error al Eliminar"
                });
            }
        });
    });

    // ---------- VACUNAS ----------
    app.get('/vacunas/:id', (req, res) => {
        Vet.getVacunas(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/vacuna', (req, res) => {
        const detalleVacuna = {
            nombre: req.body.vacuna,
            id_mascota: req.body.id_mascot,
            fecha: req.body.fecha
        };

        Vet.insertVacuna(detalleVacuna, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Vacuna insertado',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error interno del servidor'
                });
            };
        });
    });

    app.delete('/vacuna/:id', (req, res) => {
        Vet.deleteVacuna(req.params.id, (err, data) => {
            if (data && (data.msg === "Eliminado" || data.msg === "No existe")) {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: "Error interno del servidor"
                })
            }
        })
    });

    // ---------- CONSULTAS ----------
    app.get('/consultas/historial', (req, res) => {
        Vet.getConsultasHistorial((err, data) => {
            res.json(data);
        })
    });

    app.get('/consultas/admin', (req, res) => {
        Vet.getConsultasAdmin((err, data) => {
            res.json(data);
        })
    });

    app.delete('/consultas/admin', (req, res) => {
        Vet.deleteConsultasAdmin((err, data) => {
            if (data && (data.msg === "Eliminado")) {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: "Error interno del servidor"
                })
            }
        })
    });

    app.get('/consultas', (req, res) => {
        Vet.getConsultas((err, data) => {
            res.json(data);
        })
    });

    app.get('/consulta/:id', (req, res) => {
        Vet.getConsulta(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/consultas/:fecha', (req, res) => {
        Vet.getConsultasFecha(req.params.fecha, (err, data) => {
            res.json(data);
        })
    });

    app.post('/consulta', (req, res) => {
        const detalleConsulta = {
            fecha: req.body.fecha,
            hora: req.body.hora,
            finalizada: 0,
            descripcion: req.body.descripcion,
            id_mascota: req.body.mascota,
            id_medico: req.body.medico
        };

        Vet.insertConsulta(detalleConsulta, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Consulta insertada',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error interno del servidor'
                });
            };
        });
    });

    app.put('/consultas/pasadas/:fecha', (req, res) => {
        Vet.consultasPasadas(req.params.fecha, (err, data) => {
            if (data) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: "Error al Desactivar"
                });
            }
        });
    });

    app.put('/consulta/finalizar/:id', (req, res) => {
        Vet.finalizarConsulta(req.params.id, (err, data) => {
            if (data) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: "Error al Finalizar"
                });
            }
        });
    });
    
    app.put('/consulta/eliminar/:id', (req, res) => {
        Vet.deleteConsulta(req.params.id, (err, data) => {
            if (data) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: "Error al Eliminar"
                });
            }
        });
    });

    // ---------- MEDICOS ----------
    app.get('/medicos', (req, res) => {
        Vet.getMedicos((err, data) => {
            res.json(data);
        })
    });
}
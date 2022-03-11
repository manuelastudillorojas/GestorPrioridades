/**
 * Api-Key:NRAK-S18ZROT69V4I7B4O8BVYFSRTW33
 * 
 * GET 'https://api.newrelic.com/v2/alerts_events.json'
 */


const request = require('request')
const criticidadModel = require('../model/criticidad-model')
const severidadModel = require('../model/severidad-model')
const componenteModel = require('../model/componente-model')
const clientModel = require('../model/cliente-model')
const deadlineModel = require('../model/deadline-model')


const getOpenIncidentesFromNRV1 = () => {

    APIURL='https://api.newrelic.com/v2/alerts_violations.json'
    APIKEY='NRAK-79PGT4M1SCG7XGO7HD25BEFZKG9'

    return new Promise((resolve, reject) => {
        let options = {
            url: APIURL,
            method: 'GET',
            headers: {
                'Content-Type': 'json/application',
                'Api-Key': APIKEY
            },
            form: {
                'only_open': 'true'
            }
        }

        request.get(options, (err, response, body) => {
            if(err) {
                console.log(err)
                reject(err)
            } else {

                let eventos = JSON.parse(body).violations
                let objEvento = []

                eventos.forEach(evento => {

                    objEvento.push({
                            'id_incidente': evento.links.incident_id,
                            'criticidad': evento.priority,
                            'descripcion': evento.condition_name + '|' + evento.policy_name,
                            'label': evento.label,
                            'hora_registro': new Date(evento.opened_at).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                            'estado': 'open'                 
                    })
                    
                    //console.log(evento)
                })
                
                resolve(objEvento)
            }
        })
    })
}


const getCriticidad = async (attr, criticidad, id_cliente) => {
    
    const systemCrit = await criticidadModel.getCriticidadByAttr(attr, criticidad, id_cliente)
    return systemCrit.rows
}

const getSeveridad = async (attr, id_criticidad) => {
    const systemsSev = await severidadModel.getSeveridadByAttr(attr, id_criticidad)
    return systemsSev.rows
}

const getComponentes = async (id_cliente) => {
    
    const componentesCliente = await componenteModel.getComponenteByAttr('id_cliente', id_cliente)
    return componentesCliente.rows
}

const buscarComponentes = async (descripcion, id_cliente) => {

    const systemComp = await getComponentes(id_cliente)

    let objComp = []

    systemComp.forEach(data => {
        if(descripcion.includes(data.nombre)) {
            objComp.push({
                'id': data.id,
                'nombre': data.nombre,
                'puntos': data.puntos
            })
        }
    })

    return objComp
}

const getCliente = async (id_cliente) => {
    const cliente = await clientModel.getClientesById(id_cliente)

    return cliente.rows
}

const getDeadline = async (id_severidad, hora) => {
    const deadline = await deadlineModel.getDeadlineByAttr('id_severidad', id_severidad)
    return deadline.rows
}


const calculaPuntaje = async (id_cliente, id_severidad, id_criticidad, id_componente, fechaRegistroInc) => {

    const fechaActual = new Date()
    const fechaRegistro = new Date(fechaRegistroInc)
    const cliente = await getCliente(id_cliente)
    const criticidad = await criticidadModel.getCriticidadId(id_criticidad)
    const severidad = await severidadModel.getSeveridadById(id_severidad)
    const deadline = await getDeadline(id_severidad)

    if(id_componente.length > 1) {
        id_componente.forEach(comp => {
            console.log('puntaje componente : ' + comp.id )
        })
    }

    console.log('puntaje cliente : ' + cliente[0].puntos)
    console.log('puntaje criticidad : ' + criticidad.rows[0].puntos)
    console.log('puntaje severidad : ' + severidad.rows[0].puntos)
    
    fechaMins = Math.round((fechaActual.getTime() - fechaRegistro.getTime())/1000/60)
    fechaHora = fechaMins/60

  
    console.log('Horas pasadas: ' + Math.round(fechaHora))
    console.log('minutos pasados: ' + Math.round((fechaHora-Math.floor(fechaHora))*60))
    console.log('mins totales: ' + fechaMins)

    let mayorDeadeline = 0
    let puntajeDL = 0

    deadline.forEach(dl => {

        if (dl.max_min <= fechaMins && mayorDeadeline <= dl.max_min) {
            mayorDeadeline = dl.max_min
            puntajeDL = dl.puntos
        }
    })

    console.log('deadline traspasado: ' + mayorDeadeline)
    console.log('puntaje deadline : ' + puntajeDL)
}

module.exports = {
    getOpenIncidentesFromNRV1,
    getCriticidad,
    getSeveridad,
    getComponentes,
    buscarComponentes,
    calculaPuntaje
}
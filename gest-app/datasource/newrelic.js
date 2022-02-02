/**
 * Api-Key:NRAK-S18ZROT69V4I7B4O8BVYFSRTW33
 * 
 * GET 'https://api.newrelic.com/v2/alerts_events.json'
 */


const request = require('request')

const getOpenIncidentesFromNRV1 = (id_cliente) => {

    APIURL='https://api.newrelic.com/v2/alerts_violations.json'
    APIKEY='NRAK-S18ZROT69V4I7B4O8BVYFSRTW33'

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

        const response = request.get(options, (err, response, body) => {
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
                        'descripcion': evento.label,
                        'hora_registro': new Date(evento.opened_at).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                        'estado': 'open',
                        'id_cliente': id_cliente
                    })
                    //console.log(evento)
                })
               
                resolve(objEvento)
            }
        })
    })
}





const getOpenIncidentesFromNRV0 = () => {

    APIURL='https://api.newrelic.com/v2/alerts_events.json'
    APIKEY='NRAK-S18ZROT69V4I7B4O8BVYFSRTW33'

    return new Promise((resolve, reject) => {
        let options = {
            url: APIURL,
            method: 'GET',
            headers: {
                'Content-Type': 'json/application',
                'Api-Key': APIKEY
            },
            form: {
                'filter[event_type]': 'VIOLATION_OPEN'
            }
        }

        const response = request.get(options, (err, response, body) => {
            if(err) {
                console.log(err)
                reject(err)
            } else {

                let eventos = JSON.parse(body).recent_events
                let objEvento = []

                eventos.forEach(evento => {
                    objEvento.push({
                        'id_incidente': evento.incident_id,
                        'criticidad': evento.priority,
                        'descripcion': evento.description,
                        'hora_registro': new Date(evento.timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                        'estado': 'open'
                    })
                })
               
                resolve(objEvento)
            }
        })
    })
}


module.exports = {
    getOpenIncidentesFromNRV1
}
# Tracking API REST
***
Representación del estado de transfencia de los envios y sus notificiones.


## Versión 0.3
### Novedades
  * Conexión a base de datos con Mongoose
  * Definición del modulo _envios_ en la app
  * Soporte para CORS
  * Endpoints (20%)
  * Patrones de URLS
  * Colección de notificaciones para el modelo _envios_ en la db (15%)
  * Pruebas funcionales para el recuros _envios_
  * Implementación del metodo DELETE


## Iniciar el servidor REST

```shell
  $ node server
```

## Pruebas funcionales

```shell
  $ make test
```


## Metodos HTTP

|  Método  |              Descripción               |
| -------- | -------------------------------------- |
| `GET`    | Obtener un recurso o una colección     |
| `POST`   | Crear un nuevo recurso                 |
| `PUT`    | Actualizar un recurso                  |
| `DELETE` | Eliminar un recurso                    |

## Creación de un envio

El cliente WEB desde el panel de administración crea un nuevo envio donde seleciona (Origen, Destino y asocia un camión)

  **Solicitud [POST]  /api/v0.3/envios**

  	{
	    	"envio":{
		        "origen":"Monteria",
			      "destino",:"Bogota",
		        "id_camion": "VPC45FL"
  	}


El servidor manipula la solicitud asignando un id y  un estado "0" (Los clientes en Andorid buscaran por este), ademas  crea una colección para las notificaciones del envio.

 **Respuesta**

    	{
	    	"envio":{
		    	"_id": "123",
		    	"origen":"monteria",
			    "destino",:"bogota",
			    "id_camion": "VPC45FL",
			    "estado": "0",
		    	"notificaciones":[{

		    		null
		    	}]
	    	}
    	}

### Posibles estados

*Estado 0: envio creado*

*Estado 1 : envio en activo*

*Estado 2 : envio finalizado*



## Notificaciones para un envio
Cuando el cliente en Android encuentre un envio que tenga _estado_ : 0 y el _id_camion_ sea igual a su camión asociado,
                                                                solicitara una actualización del estado a activo.


**Solicitud [PUT] /api/v0.3/envios/:id/**

**Respuesta**

     {
         "envio":{
           "_id": "123",
           "origen":"monteria",
           "destino",:"bogota",
           "id_camion": "VPC45FL",
           "estado": "1",
           "notificaciones":[{

             null
           }]
         }
       }


El cliente del modulo de administración detectara el cambio de estado del envio que el creo. Posteriormente podra obtener las notificiones para ese envio.

**Solicitud [POST] /api/v0.3/envios/:id/notificaciones/**

		{
			"notificaciones":[
					{
					"notificacion":[{
						"temp":"25",
						"hum":"15",
						"lat":"83.5",
						"long":"120.75",
						"time":"05:03:20 AM",
						"date";"05-05-2014"}]
					},{
					"notificacion":[{
						"temp":"24",
						"hum":"16",
						"lat":"84.5",
						"long":"120.80",
						"time":"05:06:30 AM",
						"date";"05-05-2014"}]  
					},{
						...
						...
					}
			]
		}




## Finalizar envio
El cliente de Android indicara que el envio llego a su destino:

**Solicitud [PUT] /api/v0.3/envios/:id/**

El cliente del modulo de administración detectara el evento y sabra que el envio llego a su destino. cuando _estado_ : 2, entonces finalizaran las solicitudes GET.


**Solicitud [GET] /api/v0.3/envios/:id/**


    	{
	    	"envio":{
		    	"id": "123",
		    	"origen":"monteria",
			    "destino",:"bogota",
			    "truck_id": "VPC45FL",
			    "estado": "2",
		    	"notificaciones":[{
		    		...
		    		...
		    		...
		    	}]
	    	}
    	}

***

### Sobre el proyecto

* http://blog.uzi200.me/slides.html
  _Justificación del proyecto, arquitectura, investigación._

* Repositorio del cliente en Andorid ->

### Contacto

julioc255io@gmail.com

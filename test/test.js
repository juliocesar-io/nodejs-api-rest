var request = require('supertest-as-promised');
var api =  require('../server.js');
var host = process.env.API_TEST_HOST || api;
//var host = 'http://localhost:3000';
var _ = require('lodash');
request = request(host);

/* Pruebas funcionales*/
describe('[api/v0.3/envios/]', function(){

	describe('POST', function(){
		it('Deberia crear un envio',function(done){
			var data = {
				"envio":{
					"origen":"Monteria",
					"destino":"Bogota",
					"id_camion":"XML255"
				}
			};
			request
				.post('/api/v0.3/envios')
				.set('Accept','application/json')
				.send(data)
				.expect(201)
				.expect('Content-Type', /application\/json/)
				.end(function(err, res){

					var envio;			
					var body = res.body;
		
					expect(body).to.have.property('envio');
					envio = body.envio;

					expect(envio).to.have.property('_id');		
				done(err);
			});
		});
	});

	describe('GET', function(){
		it('Deberia obtener un envio existente', function(done){
			var id;
	   		var data = {
				"envio":{
						"origen":"Valencia",
						"destino":"Tierralta",
						"id_camion":"HM53D"
				}
			};
			request
				.post('/api/v0.3/envios')
				.set('Accept','application/json')
				.send(data)
				.expect(201)
				.expect('Content-Type', /application\/json/)
			.then(function getEnvio(res) {
				id = res.body.envio._id;
				// Capturar el body en el contexto actual
				this.body = res.body;

				//GET [:id]
				return request.get('/api/v0.3/envios/' + id)
					.set('Accept', 'application/json')
					.send()
					.expect(200)
					.expect('Content-Type', /application\/json/)
				// Pasar el body con bind
			}, done).bind()
			.then(function assertions(res) {
				var envio;
				var body = this.body;
		
				expect(body).to.have.property('envio');
				envio = body.envio;

				expect(envio).to.have.property('_id', id);
				done();

			}, done);
		});
	});

	describe('GET [*]', function() {
		it('Deberia obtener todos los envios', function(done) {
			var id1;
			var id2;
			var data1 = {
				"envio":{
					"origen":"Barranquilla",
					"destino":"Bogota",
					"id_camion":"XML255"
				}
			};
			var data2 = {
				"envio":{
					"origen":"Cartagena",
					"destino":"Cali",
					"id_camion":"FFZ534"
				}
			};
			request
				.post('/api/v0.3/envios')
				.set('Accept','application/json')
				.send(data1)
				.expect(201)
				.expect('Content-Type', /application\/json/)
			.then(function createAnotherEnvio(res){
				id1 = res.body.envio._id;
				return request
					.post('/api/v0.3/envios')
					.set('Accept','application/json')
					.send(data2)
					.expect(201)
					.expect('Content-Type', /application\/json/)
			})
			.then(function getEnvios(res) {
				id2 = res.body.envio._id;
				
				return request
					.get('/api/v0.3/envios/')
					.set('Accept', 'application/json')
					.send()
					.expect(200)
					.expect('Content-Type', /application\/json/)
			}, done)
			.then(function assertions(res) {

				var body = res.body;
				expect(body).to.have.property('envios');
				expect(body.envios).to.be.an('array')
						.and.to.have.length.above(1);

				var envios = body.envios;

				var envio1 = _.find(envios, {_id:id1});
				var envio2 = _.find(envios, {_id:id2});
			
				expect(envio1).to.have.property('_id', id1);
				expect(envio2).to.have.property('_id', id2);
		
				done();
			},done);
		});
	});

	describe('PUT', function(){
		it('Deberia actualizar un envio existente', function(done){
			var id;
			var data = {
				"envio": {
						"origen":"post_inicial",
						"destino":"post_inicial",
						"id_camion":"post_inicial"
				}
			};
			// Crear el envio (POST)
			request
				.post('/api/v0.3/envios')
				.set('Accept','application/json')
				.send(data)
				// Obtener el envio (GET)
			.then(function getEnvio(res) {
				var update = {
						"envio": {
							"id_camion":"put_cambio"
						}
					};

				id = res.body.envio._id;

				return request.put('/api/v0.3/envios/' + id)
         			.set('Accept', 'application/json')
          			.send(update)
          			.expect(200)
          			.expect('Content-Type', /application\/json/)
			},done)
			// Evaluar que se creo correctamente
			.then(function assertions(res) {
				var envio;
        		var body = res.body;

       			// Nota existe
    		    expect(body).to.have.property('envio');
        		envio = body.envio;

        		// Propiedades
      			expect(envio).to.have.property('ok', true);
 
			
				done();
			}, done);
		});
	});

	describe('DELETE', function(){
		it('Deberia eliminar un envio existente', function(done){
			var id;
			var data = {
				"envio":{
					"origen":"ELIMINAME",
					"destino":"ELIMINAME",
					"id_camion":"ELIMINAME"
				}
			};
			request
				.post('/api/v0.3/envios')
				.set('Accept','application/json')
				.send(data)
				.expect(201)
				.expect('Content-Type', /application\/json/)
			.then(function deleteEnvio(res) {
				id = res.body.envio._id;
				// Eliminar el envio
				return request.delete('/api/v0.3/envios/'+ id)
					.set('Accept', 'application/json')
					.expect(204)
			}, done)
			.then(function assertions(res) {
        			// Probamos que de verdad no exista
        			return request.get('/api/v0.3/envios/' + id)
          					.expect(404);
     		}, done)
			.then(function(){
				done();
			});
		});
	});
});

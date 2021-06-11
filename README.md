# car-project

Project assumes that database already exists where migration can be run

1. run npm install <- installing all necessary dependencies
2. run npm start <- runs migration and start the server on port 3000
    - db structure: 
        -  id: auto generated UUID
        -  name: car name (string)
        -  type: car type (string)
        -  colour: car colour (string)
        -  engine: car engine (string)
        -  hp: horsepower (numner)
        -  created_at
        -  updated_at

# Endpoints

1. GET: /api/v1/car/:id? <- :id is optional UUID parameter, get car by id or get all cars
2. CREATE: /api/v1/car/ <- creates car after validating the schema
    - Example request:
       {
          "name": "Bugatti Chiron",
          "type": "hypercar",
          "engine": "gasoline",
          "colour": "black",
          "hp": 1500
        }
4. PATCH: /api/v1/car/:id <- :id is mandatory parameter, allows update car hp
     - Example request:
       {
          "hp": 69
       }
6. DELETE: /api/v1/car/:id <- :id is mandatory parameter, allows to delete car by id

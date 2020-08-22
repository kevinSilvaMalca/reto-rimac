# Visión General

Crear una API en Node.js con el framework Serverless.js para un despliegue en AWS.
Adaptar y transformar los modelos de la API de prueba. Se tienen que mapear todos los nombres de atributos modelos del inglés al español (Ej: name -> nombre).
Integrar la API de prueba StarWars API (lineas abajo está el link) se deben integrar uno o más endpoints.
Crear un modelo de su elección mediante el uso de un endpoint POST, la data se tendrá que almacenar dentro de una base de datos.
Crear un endpoint GET que muestre la data almacenada.

[[API de prueba SWAPI: https://swapi.py4e.com/documentation](https://swapi.py4e.com/documentation)]()

### Ficheros

    .
    ├── serverless.yml
    ├── src
    │ └── controllers
    | ├── getPlaneta.js
    | └── postPlaneta.js
    │ ├── db
    │ ├── helpers
    | └── utils
    |
    ├── package.json
    ├── README.md
    └── REQUERIMIENTOS.md

- 1.- configurar aws-cli y serverless

  sudo apt-get awscli sudo npm install -g aws-cli serverless #configuramos sudo aws configure aws access key id [none]: ####

  AWS Secret Access Key [None]: ###
  Default region name [None]: ###
  Default output format [None]: json

  sudo sls config credentials --provider aws --key ###ID#### --secret ###PAS### --profile serverless-rimac

- 2.- Plantilla Serverless

  sudo sls create -t aws-nodejs

  EJECUTANDO PRUEBAS

  sls invoke local -f ####

  sls invoke local -f hello -d '######'

  npm install --save-dev serverless-offline

- 3.- Deploy AWS

  sls deploy
  sls remove

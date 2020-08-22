# 2.- Configurar AWS-CLI y SERVERLESS

```
sudo apt-get awscli
sudo npm install -g aws-cli serverless

#Configuramos
sudo aws configure

AWS Access Key ID [None]: ####
AWS Secret Access Key [None]: ###
Default region name [None]: ###
Default output format [None]: json

sudo sls config credentials --provider aws --key ###ID#### --secret ###PAS### --profile serverless-rimac


```

# 3.- Plantilla Serverless

```
sudo sls create -t aws-nodejs

EJECUTANDO PRUEBAS

sls invoke local -f ####

sls invoke local -f hello -d '######'

npm install --save-dev serverless-offline  
```

# 4.- Deploy AWS

```
sls deploy -f hello
sls deply -s production -f hello
sls logs -f hello -s production --startTime 10m
sls remove -s dev


```


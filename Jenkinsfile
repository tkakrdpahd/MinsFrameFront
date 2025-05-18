pipeline {
  agent any

  stages {
    stage('Prepare .env') {
      steps {
        withCredentials([file(credentialsId: 'mins-frame-env', variable: 'ENV_FILE')]) {
          sh '''
            rm -f .env
            cp "$ENV_FILE" .env
            chmod 600 .env
          '''
        }
      }
    }

    stage('Docker Build & Up') {
      steps {
        dir('docker') {
          sh '''
            docker compose --env-file ../.env -f docker-compose.prod.yml build --no-cache
            docker compose --env-file ../.env -f docker-compose.prod.yml up -d
          '''
        }
      }
    }
  }
}

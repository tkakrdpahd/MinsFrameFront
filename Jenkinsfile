pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // SCM에서 소스코드 체크아웃
                checkout scm
            }
        }
        stage('Prepare Environment') {
            steps {
                // withCredentials를 사용해 artbooth.io-env 파일 주입 후 .env로 복사
                withCredentials([file(credentialsId: 'mins-frame-env', variable: 'ENV_FILE')]) {
                    sh 'rm -f .env && cp $ENV_FILE .env'
                    echo "Environment file injected and copied to .env"
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                echo "Building Docker Images using docker-compose.dev.yml..."
                sh 'docker compose -f docker-compose.prod.yml build --no-cache'
            }
        }
        stage('Stop & Remove Existing Containers') {
            steps {
                echo "Stopping and removing existing containers..."
                sh 'docker compose -f docker-compose.prod.yml down'
            }
        }
        stage('Run Docker Containers') {
            steps {
                echo "Running Docker Containers..."
                sh 'docker compose -f docker-compose.prod.yml up -d'
            }
        }
    }
    post {
        always {
            echo "Production Pipeline Completed."
        }
    }
}
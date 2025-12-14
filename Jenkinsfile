pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build and Deploy') {
            steps {
                script {
                    sh 'docker compose up -d --build'
                }
            }
        }
        stage('Health Check') {
            steps {
                script {
                    sh '''
                        sleep 5
                        curl -f http://localhost:3000 || exit 1
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                sh '''
                    docker compose ps || true
                    docker compose logs || true
                '''
            }
            echo "Production Pipeline Completed."
        }
        success {
            echo "Build and deployment successful!"
        }
        failure {
            echo "Build or deployment failed!"
        }
    }
}
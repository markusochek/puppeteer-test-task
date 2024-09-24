pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker build -t myapp:${BUILD_NUMBER} .'
            }
        }
        
        stage('Test') {
            steps {
                sh 'docker run myapp:${BUILD_NUMBER} npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker stop myapp || true'
                sh 'docker rm myapp || true'
                sh 'docker run -d --name myapp -p 3000:3000 myapp:${BUILD_NUMBER}'
            }
        }
    }
}

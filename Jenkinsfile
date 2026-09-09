pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Student Eligibility System'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t student-eligibility-system .'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker stop student-eligibility-system || exit 0'
                bat 'docker rm student-eligibility-system || exit 0'
                bat 'docker run -d -p 8081:80 --name student-eligibility-system student-eligibility-system'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Student Eligibility System deployed successfully!'
            }
        }
    }
}
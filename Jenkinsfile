pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out SmartNest source code...'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t smartnest .'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker rm -f smartnest-container || exit 0'
                bat 'docker run -d -p 3000:80 --name smartnest-container smartnest'
            }
        }
    }
}
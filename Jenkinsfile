pipeline {
    agent any

    environment {
        // Define environment variables
        DB_HOST = 'clinic-web-database-container'
        BE_PORT = '3000'
        DB_NAME = 'clinic_database'
        DB_USER = 'postgres'
        DB_PASSWORD = 'clinic_database_pass'
        DB_PORT = '5432'
        FE_PORT = '3001'
        REACT_APP_BACKEND_URL = 'http://localhost:3000'
    }

    stages {
        stage('Build Backend') {
            steps {
                script {
                    // Build backend Docker image
                    dir('clinicWebApp/server') {
                        docker.build("backend-image", "-f Dockerfile .")
                    }
                }
            }
        }

        stage('Build Database') {
            steps {
                script {
                    // Build database Docker image
                    dir('clinicWebApp/database') {
                        docker.build("database-image", "-f Dockerfile .")
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    // Build frontend Docker image
                    dir('clinicWebApp/client') {
                        docker.build("frontend-image", "-f Dockerfile .")
                    }
                }
            }
        }
    }
}

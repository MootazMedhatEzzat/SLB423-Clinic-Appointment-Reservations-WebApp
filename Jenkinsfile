pipeline {
    agent any

    stages {
        stage('Build Database Image') {
            steps {
                script {
                    dir('clinicWebApp/database') {
                        bat 'docker build -t clinic-web-database-image .'
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    dir('clinicWebApp/server') {
                        bat 'docker build -t clinic-web-server .'
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    dir('clinicWebApp/client') {
                        bat 'docker build -t clinic-web-client .'
                    }
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    dir('clinicWebApp') {
                        bat '''
                            docker network create ui-network
                            docker network create api-network
                            docker-compose up -d
                        '''
                    }
                }
            }
        }
    }
}

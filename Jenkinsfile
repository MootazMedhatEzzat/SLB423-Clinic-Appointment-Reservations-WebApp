pipeline {
    agent any

    stages {
        stage('Build and Deploy Backend') {
            steps {
                script {
                    dir('clinicWebApp/server') {
                        // Build backend Docker image
                        docker.build('clinic-web-backend-image')

                        // Run backend Docker container
                        docker.image('clinic-web-backend-image').run('-p 3000:3000 --name clinic-web-backend --network api-network -e DB_HOST=clinic-web-database-container -e BE_PORT=3000 clinic-web-backend-image:latest')
                    }
                }
            }
        }

        stage('Build and Deploy Frontend') {
            steps {
                script {
                    dir('clinicWebApp/client') {
                        // Build frontend Docker image
                        docker.build('clinic-web-frontend-image')

                        // Run frontend Docker container
                        docker.image('clinic-web-frontend-image').run('-p 3001:3001 --name clinic-web-frontend --network ui-network -e REACT_APP_BACKEND_URL=http://clinic-web-backend:3000 -e FE_PORT=3001 clinic-web-frontend-image:latest')
                    }
                }
            }
        }
    }
}

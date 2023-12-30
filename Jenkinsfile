pipeline {
    agent any

    stages {
        stage('Build and Deploy Database') {
            steps {
                script {
                    powershell '''
                        docker network create ui-network | Out-Null
                        docker network create api-network | Out-Null

                        cd clinicWebApp/database
                        docker build -t clinic-web-database-image .
                        docker run -d -p 5432:5432 --name clinic-web-database-container --network api-network -e DB_NAME=clinic_database -e DB_USER=postgres -e DB_PASSWORD=clinic_database_pass -e DB_PORT=5432 -v clinic-web-data:/var/lib/postgresql/data clinic-web-database-image
                    '''
                }
            }
        }

        stage('Build and Deploy Backend') {
            steps {
                script {
                    powershell '''
                        cd clinicWebApp/server
                        docker build -t clinic-web-server .
                        docker run -d -p 3000:3000 --name clinic-web-backend --network api-network -e DB_HOST=clinic-web-database-container -e BE_PORT=3000 clinic-web-server:latest
                        docker network connect ui-network clinic-web-backend
                    '''
                }
            }
        }

        stage('Build and Deploy Frontend') {
            steps {
                script {
                    powershell '''
                        cd clinicWebApp/client
                        docker build -t clinic-web-client .
                        docker run -d -p 3001:3001 --name clinic-web-frontend --network ui-network -e REACT_APP_BACKEND_URL=http://localhost:3000 -e FE_PORT=3001 clinic-web-client:latest
                    '''
                }
            }
        }
    }
}

# SLB423-Clinic-Appointment-Reservations-WebApp_Phase-2

# Team members
| Name                                   | Student ID |
| -------------------------------------- | ---------- |
| Mootaz Medhat Ezzat Abdelwahab         |  20206074  |
| Salma Hossam elden Hassan Mohamed      |  20206031  |

# Features
- Sign In 
- Sign up
- Doctor set his schedule. (Inserting a slot)
- Patients select doctor, view his available slots, then patient chooses a slot.
- Patient can update his appointment.
- Patient can cancel his appointment.
- Patients can view all his reservations.

# APIs 
- http://localhost:3000/api/signup
- http://localhost:3000/api/signin
- http://localhost:3000/api/doctors/addslot
- http://localhost:3000/api/doctors/cancelslot
- http://localhost:3000/api/doctors/slots/:id
- http://localhost:3000/patients/getdoctors
- http://localhost:3000/api/patients/:id/getslots
- http://localhost:3000/api/patients/bookappointment
- http://localhost:3000/api/patients/updateappointment
- http://localhost:3000/api/patients/cancelappointment
- http://localhost:3000/api/patients/:id/reservations

# Tech Stack
| Frontend | Backend | Database |
| ---------| --------| -------- |
|   react  | Node.js | postgres |

# Running
### Clone the repository and execute this script `deploy.sh`
### Or clone the repository, open terminal, and run:
- Create docker networks:
  - `docker network create ui-network`
  - `docker network create api-network`
- Build and run database container:
  - `cd clinicWebApp/database`
  - `docker build -t clinic-web-database-image .`
  - `docker run -d -p 5432:5432 --name clinic-web-database-container --network api-network -e DB_NAME=clinic_database -e DB_USER=postgres -e DB_PASSWORD=clinic_database_pass -e DB_PORT=5432 -v clinic-web-data:/var/lib/postgresql/data clinic-web-datab`
- Build and run backend server container:
  - `cd ../server`
  - `docker build -t clinic-web-server .`
  - `docker run -d -p 3000:3000 --name clinic-web-backend --network api-network -e DB_HOST=clinic-web-database-container -e BE_PORT=3000 clinic-web-server:latest`
- Connect backend server to ui-network
  - `docker network connect ui-network clinic-web-backend`
- Build and run frontend client container:
  - `cd ../client`
  - `docker build -t clinic-web-client .`
  - `docker run -d -p 3001:3001 --name clinic-web-frontend --network ui-network -e REACT_APP_BACKEND_URL=http://localhost:3000 -e FE_PORT=3001 clinic-web-client:latest`

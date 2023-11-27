# SLB423-Clinic-Appointment-Reservations-WebApp

# Team members
- Mootaz Medhat Ezzat Abdelwahab    (20206074)
- Salma Hossam elden Hassan Mohamed (20206031)

# APIs 
- http://localhost:3000/api/signup
- http://localhost:3000/api/signin
- http://localhost:3000/api/doctors/addslot
- http://localhost:3000/api/doctors/cancelslot
- http://localhost:3000/api/doctors/slots/:id
- http://localhost:3000/api/patients/:id/getslots
- http://localhost:3000/api/patients/bookappointment
- http://localhost:3000/api/patients/updateappointment
- http://localhost:3000/api/patients/cancelappointment
- http://localhost:3000/api/patients/:id/reservations

# Running
Clone the repository and open four terminals:
- In the first terminal, run:
  - `docker network create ui-network`
  - `docker network create api-network`
- In the seconde terminal, run:
  - `cd clinicWebApp/database`
  - `docker build -t clinic-web-database-image .`
  - `docker run -d -p 5432:5432 --name clinic-web-database-container --network api-network -v clinic-web-data:/var/lib/postgresql/data clinic-web-database-image:latest`
- In the third terminal, run:
  - `cd clinicWebApp/server`
  - `docker build -t clinic-web-server .`
  - `docker run -d -p 3000:3000 --name clinic-web-backend --network api-network clinic-web-server:latest`
  - `docker network connect ui-network clinic-web-backend`
- In the fourth terminal, run:
  - `cd clinicWebApp/client`
  - `docker build -t clinic-web-client .`
  - `docker run -d -p 3001:3001 --name clinic-web-frontend --network ui-network clinic-web-client:latest`

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
Clone the repository and open two terminals:
- In the first terminal, run:
cd clinicWebApp/client -> npm run build
- In the seconde terminal, run:
cd clinicWebApp/server -> node serverjs

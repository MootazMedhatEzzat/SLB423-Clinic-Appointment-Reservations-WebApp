# SLB423-Clinic-Appointment-Reservations-WebApp_Phase-1
During the initial phase of the project, efforts were focused on building and developing the project’s back-end, front-end, and Database. This was based on the tech stack designated to our team.

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

# RESTful APIs 
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
Clone the repository and open two terminals:
- In the first terminal, run:
  - `cd clinicWebApp/client`
  - `npm run build`
  - `node server.js`
- In the seconde terminal, run:
  - `cd clinicWebApp/server`
  - `node server.js`

# 📌 **API-Dokumentasjon – PadelZone Booking System**

## chatGPT

Jeg har brukt chatGPT til å hjelpe meg å formattere dette dokumentet, lage logoen og finne navnet til Padelzone, samt noe CSS. Ellers har chatGPT blitt brukt til å vise meg hvordan man bruker enkelte metoder osv. Jeg har ikke klippet ut og brukt, eller limt egen kode inn i chatGPT. Hovedkildene mine er W3School og react.dev. Jeg har også sett kurs på LinkedIn Learning.

## Generelt

Av én eller annen grunn så låser brukeren til den innebygde admin seg. Jeg har funnet ut at i de tilfellene den gjør det, så kan man lukke fanen, og åpne på nytt via terminal. Jeg har gitt en annen bruker admin-status, og denne brukeren har aldri låst seg. Jeg mistenker at det oppstår en uendelig look, men jeg har ikke funnet ut av det enda..

## 🌍 **Base URL**

```
https://crudcrud.com/api/YOUR_API_KEY/
```

Alle API-endepunktene krever en gyldig **API-nøkkel** fra `crudcrud.com`.  
Erstatt `YOUR_API_KEY` med din faktiske API-nøkkel, i filen apiConfig. Denne
filen finner du under

/src/api/apiConfig.ts

---

## 📁 **Endepunkter**

### 📌 **Brukere (`/users`)**

Det finnes én innebygget admin som kan logges inn med adressen:

```json
admin@padelzone.no
```

Denne brukeren lagres ikke på databasen, men i localStorage.

| Metode   | Endepunkt     | Beskrivelse                     |
| -------- | ------------- | ------------------------------- |
| `GET`    | `/users`      | Hent alle brukere               |
| `GET`    | `/users/{id}` | Hent én spesifikk bruker        |
| `POST`   | `/users`      | Opprett en ny bruker            |
| `PUT`    | `/users/{id}` | Oppdater en eksisterende bruker |
| `DELETE` | `/users/{id}` | Slett en bruker (kun for admin) |

#### 🔹 **Eksempel – Opprette en bruker**

**Request:**

```json
POST /users
Content-Type: application/json

{
    "name": "Ola Nordmann",
    "email": "ola@example.com",
    "role": "user"
}
```

**Response:**

```json
{
    "_id": "654a7bfc9c1b4d001b2e5678",
    "name": "Ola Nordmann",
    "email": "ola@example.com",
    "role": "user"
}
```

---

### 📌 **Bookinger (`/bookings`)**

| Metode   | Endepunkt        | Beskrivelse                      |
| -------- | ---------------- | -------------------------------- |
| `GET`    | `/bookings`      | Hent alle bookinger              |
| `GET`    | `/bookings/{id}` | Hent én spesifikk booking        |
| `POST`   | `/bookings`      | Opprett en ny booking            |
| `PUT`    | `/bookings/{id}` | Oppdater en eksisterende booking |
| `DELETE` | `/bookings/{id}` | Slett en booking                 |

#### 🔹 **Eksempel – Opprette en booking**

**Request:**

```json
POST /bookings
Content-Type: application/json

{
    "userId": "654a7bfc9c1b4d001b2e5678",
    "courtId": "3",
    "date": "2025-03-15",
    "timeslot": "10:00"
}
```

**Response:**

```json
{
    "_id": "65ac98e27b1a2e003c5a890b",
    "userId": "654a7bfc9c1b4d001b2e5678",
    "courtId": "3",
    "date": "2025-03-15",
    "timeslot": "10:00"
}
```

---

### 📌 **Tilgangskontroll**

-   Vanlige brukere kan **kun** opprette, lese og redigere sine egne bookinger.
-   **Administratorer** kan:
    -   Se og redigere **alle bookinger**
    -   Se, redigere og slette **brukere**
    -   Opprette bookinger for andre brukere.

---

## ⚠️ **Feilmeldinger**

| Statuskode | Beskrivelse         |
| ---------- | ------------------- |
| `400`      | Ugyldig forespørsel |
| `401`      | Ikke autorisert     |
| `403`      | Ingen tilgang       |
| `404`      | Ressurs ikke funnet |
| `500`      | Intern serverfeil   |

---

import { Patient } from "../pages/patient/PatientPage";
import { indianPatients } from "../test-data/names";

export class DataFactory {
  static loginData = {
    tenant: "testing",
    username: "admin",
    password: "password@123",
  };

  static generatePhoneNumber(): string {
    return Math.floor(9000000000 + Math.random() * 1000000000).toString();
  }

  static generateAge(): string {
    const age = 18 + Math.floor(Math.random() * 60);
    return age.toString();
  }

  static generateCardNumber(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

  static generateUniqueEmail(firstName: string, lastName: string): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);

    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${timestamp}${random}@gmail.com`;
  }

  // 🔹 CREATE PATIENT
  static buildPatient(): Patient {
    const randomPatient =
      indianPatients[Math.floor(Math.random() * indianPatients.length)];

    return {
      firstName: randomPatient.firstName,
      lastName: randomPatient.lastName,
      email: this.generateUniqueEmail(
        randomPatient.firstName,
        randomPatient.lastName,
      ),
      phone: this.generatePhoneNumber(),
      age: this.generateAge(),
      address: "Delhi",
      gender: randomPatient.gender,
    };
  }

  // 🔥 UPDATE PATIENT (NEW)
  static buildPatientUpdateData(overrides?: Partial<{ age: string; cardNumber: string }>) {
    return {
      age: this.generateAge(),
      cardNumber: this.generateCardNumber(),
      ...overrides,
    };
  }

  // 🔹 DOCTOR
  static generateDoctorUser() {
    const firstNames = ["Dhruv", "Amit", "Rahul", "Rohit", "Arjun", "Vikas", "Ankit"];
    const lastNames = ["Kumar", "Sharma", "Verma", "Gupta", "Mehta", "Singh"];
    const addresses = ["Delhi", "Mumbai", "Bangalore", "Jaipur", "Ahmedabad"];

    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];

    const username = `${first.toLowerCase()}${Math.floor(Math.random() * 1000)}`;

    return {
      username,
      firstName: first,
      lastName: last,
      email: `${first}${last}@gmail.com`.toLowerCase(),
      phone: "9" + Math.floor(100000000 + Math.random() * 900000000),
      license: Math.floor(100000 + Math.random() * 900000).toString(),
      address: addresses[Math.floor(Math.random() * addresses.length)],
      role: "Doctor",
    };
  }

  // 🔹 ASSISTANT
  static generateAssistantUser() {
    const firstNames = ["Pooja", "Neha", "Anjali", "Sneha", "Riya", "Kiran", "Megha"];
    const lastNames = ["Kumar", "Sharma", "Verma", "Gupta", "Mehta", "Singh"];
    const addresses = ["Delhi", "Mumbai", "Bangalore", "Jaipur", "Ahmedabad"];

    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];

    const uniqueId = Date.now();
    const username = `${first.toLowerCase()}${uniqueId}`;

    return {
      username,
      firstName: first,
      lastName: last,
      email: `${username}@mail.com`,
      phone: "9" + Math.floor(100000000 + Math.random() * 900000000),
      address: addresses[Math.floor(Math.random() * addresses.length)],
      role: "Assistant",
    };
  }


}

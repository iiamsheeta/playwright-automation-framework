export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export const indianPatients: {
  firstName: string;
  lastName: string;
  gender: Gender;
}[] = [
  { firstName: "Rahul", lastName: "Sharma", gender: "MALE" },
  { firstName: "Amit", lastName: "Patel", gender: "MALE" },
  { firstName: "Arjun", lastName: "Singh", gender: "MALE" },
  { firstName: "Rohit", lastName: "Mehta", gender: "MALE" },

  { firstName: "Priya", lastName: "Verma", gender: "FEMALE" },
  { firstName: "Sneha", lastName: "Reddy", gender: "FEMALE" },
  { firstName: "Anjali", lastName: "Desai", gender: "FEMALE" },
  { firstName: "Kavita", lastName: "Nair", gender: "FEMALE" },

  { firstName: "Aman", lastName: "Kumar", gender: "OTHER" },
  { firstName: "Alex", lastName: "Joseph", gender: "OTHER" }
];
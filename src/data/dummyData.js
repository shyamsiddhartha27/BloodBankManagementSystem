export const DONORS = [
  { id: 'D001', name: 'John Doe', age: 28, bloodGroup: 'A+', phone: '9876543210' },
  { id: 'D002', name: 'Jane Smith', age: 34, bloodGroup: 'O-', phone: '8765432109' },
  { id: 'D003', name: 'Mike Ross', age: 25, bloodGroup: 'B+', phone: '7654321098' },
  { id: 'D004', name: 'Harvey Specter', age: 42, bloodGroup: 'AB+', phone: '6543210987' },
];

export const PATIENTS = [
  { id: 'P001', name: 'Robert Brown', bloodGroup: 'A+', unitsRequired: 2 },
  { id: 'P002', name: 'Alice Wilson', bloodGroup: 'O-', unitsRequired: 1 },
  { id: 'P003', name: 'David Miller', bloodGroup: 'B+', unitsRequired: 3 },
];

export const BLOOD_STOCK = [
  { group: 'A+', units: 15 },
  { group: 'A-', units: 5 },
  { group: 'B+', units: 20 },
  { group: 'B-', units: 3 },
  { group: 'O+', units: 25 },
  { group: 'O-', units: 2 },
  { group: 'AB+', units: 8 },
  { group: 'AB-', units: 4 },
];

export const REQUESTS = [
  { id: 'REQ001', patientId: 'P001', bloodGroup: 'A+', units: 2, status: 'Completed' },
  { id: 'REQ002', patientId: 'P002', bloodGroup: 'O-', units: 1, status: 'Pending' },
  { id: 'REQ003', patientId: 'P003', bloodGroup: 'B+', units: 3, status: 'Pending' },
];

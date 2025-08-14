// Utility for booking the appointment via API
export async function bookAppointment(details: {
  firstName: string;
  lastName: string;
  email: string;
  postcode: string;
  phone: string;
  notes: string;
  isExistingCustomer: boolean;
  date: string;
  time: string;
}): Promise<void> {
  // TODO: Replace this mock with actual API call
  // Example:
  // await fetch('/api/book-appointment', { method: 'POST', body: JSON.stringify(details) });

  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));
}
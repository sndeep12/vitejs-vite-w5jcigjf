// Utility for fetching available slots from API
export async function fetchAvailableSlots(location: string, date: string): Promise<string[]> {
  // TODO: Replace this with actual API call
  // Example: const response = await fetch(`/api/slots?location=${location}&date=${date}`);
  // return await response.json();

  // Mocked slots for demonstration
  return [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"
  ];
}
// Utility for recording data privacy consent via API
export async function recordConsent(details: {
  name: string;
  email: string;
  phone: string;
  location: string;
  date: string;
  time: string;
  consent: boolean;
}): Promise<void> {
  // TODO: Replace this mock with actual API call
  // Example:
  // await fetch('/api/consent', { method: 'POST', body: JSON.stringify(details) });

  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));
}
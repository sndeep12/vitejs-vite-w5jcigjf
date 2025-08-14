import React from "react";

export default function ConfirmationStep({ booking, onPrev }: {
  booking: {
    location: string;
    date: string;
    time: string;
    details: { name: string; email: string; phone: string };
  };
  onPrev: () => void;
}) {
  return (
    <div>
      <h2>Confirm Your Booking</h2>
      <ul>
        <li>Location: {booking.location}</li>
        <li>Date: {booking.date}</li>
        <li>Time: {booking.time}</li>
        <li>Name: {booking.details.name}</li>
        <li>Email: {booking.details.email}</li>
        <li>Phone: {booking.details.phone}</li>
      </ul>
      <button onClick={onPrev}>Back</button>
      <button onClick={() => alert("Booking Confirmed!")}>Confirm Booking</button>
    </div>
  );
}
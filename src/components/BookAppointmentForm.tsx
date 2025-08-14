import React, { useState, useEffect } from "react";
import { bookAppointment } from "../api/bookAppointment";
import "./BookAppointmentForm.css";

const APPOINTMENT_HOLD_MINUTES = 20;

export default function BookAppointmentForm({
  bookingDate,
  bookingTime,
  onBack,
}: {
  bookingDate: string;
  bookingTime: string;
  onBack: () => void;
}) {
  const [timer, setTimer] = useState(APPOINTMENT_HOLD_MINUTES * 60);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "+44",
    email: "",
    postcode: "",
    notes: "",
    isExistingCustomer: false,
  });
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBook = async () => {
    setError(null);
    // Simple validation
    if (
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.email ||
      !form.postcode
    ) {
      setError("Please fill all mandatory fields.");
      return;
    }
    setBooking(true);
    try {
      await bookAppointment({
        ...form,
        date: bookingDate,
        time: bookingTime,
      });
      alert("Appointment booked successfully!");
      // Optionally, route to confirmation page here
    } catch (e) {
      setError("Failed to book appointment. Please try again.");
    }
    setBooking(false);
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="book-appt-root">
      <div className="book-appt-header">
        <div>
          <div className="book-appt-tag">Video Banking</div>
          <h1>Book a time slot that works for you</h1>
          <div className="book-appt-subtext">
            All Financial Health Check appointments are for 1 hour
          </div>
          <div className="book-appt-details">
            <span>
              <strong>Booking Date:</strong> {bookingDate}
            </span>
            <span>
              <strong>Booking Time:</strong> {bookingTime}
            </span>
          </div>
        </div>
        <div className="book-appt-image"></div>
      </div>
      <div className="book-appt-form-wrapper">
        <div className="book-appt-timer">
          <span>⚠️ The slot is held for: {minutes}m {seconds < 10 ? `0${seconds}` : seconds}s</span>
        </div>
        <form
          className="book-appt-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleBook();
          }}
        >
          <label className="book-appt-checkbox">
            <input
              type="checkbox"
              name="isExistingCustomer"
              checked={form.isExistingCustomer}
              onChange={handleChange}
            />
            Are you an existing customer?
          </label>

          <div className="book-appt-fields">
            <div>
              <label>
                First name<span className="book-appt-required">*</span>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Last name<span className="book-appt-required">*</span>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Telephone number<span className="book-appt-required">*</span>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Email address<span className="book-appt-required">*</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Postcode<span className="book-appt-required">*</span>
                <input
                  type="text"
                  name="postcode"
                  value={form.postcode}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Notes
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  maxLength={500}
                  rows={3}
                  placeholder="You have 500 characters remaining"
                />
              </label>
            </div>
          </div>
          <div className="book-appt-error">{error}</div>
          <div className="book-appt-buttons">
            <button
              type="button"
              className="book-appt-back"
              onClick={onBack}
              disabled={booking}
            >
              Back
            </button>
            <button
              type="submit"
              className="book-appt-book"
              disabled={booking}
            >
              Book appointment
            </button>
          </div>
        </form>
        <div className="book-appt-info">
          All the details captured above will only be used to book and manage your appointment. They will not be used for any marketing purposes.
        </div>
      </div>
      <footer className="book-appt-footer">
        <span>
          Copyright © National Westminster Bank plc 2025 | 
          <a href="#">Terms &amp; Conditions and FSCS</a> | 
          <a href="#">Privacy &amp; Cookies</a> | 
          <a href="#">Accessibility</a>
        </span>
      </footer>
    </div>
  );
}
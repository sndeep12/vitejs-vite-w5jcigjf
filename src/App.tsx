import React, { useState } from "react";
import LocationStep from "./components/LocationStep";
import DateStep from "./components/DateStep";
import TimeStep from "./components/TimeStep";
import BookAppointmentForm from "./components/BookAppointmentForm";
import ConfirmationStep from "./components/ConfirmationStep";
import "./App.css";

const steps = [
  "Location",
  "Date",
  "Time",
  "Details",
  "Confirmation"
];

const initialBooking = {
  location: "",
  date: "",
  time: "",
  details: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    postcode: "",
    notes: "",
    isExistingCustomer: false
  }
};

function App() {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState({ ...initialBooking });

  // Navigation helpers
  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const routeToInitialPage = () => {
    setStep(0);
    setBooking({ ...initialBooking });
  };

  // Handler for details form submission
  const handleDetailsSubmit = (details: typeof initialBooking.details) => {
    setBooking({ ...booking, details });
    nextStep();
  };

  // Handler for appointment booking (simulate confirmation for now)
  const handleAppointmentBooked = () => {
    nextStep();
  };

  return (
    <div className="app-container">
      <h1>Book a Time Slot</h1>
      <div className="step-indicator">
        {steps.map((label, idx) => (
          <span key={label} className={idx === step ? "active" : ""}>{label}</span>
        ))}
      </div>
      <div className="step-content">
        {step === 0 && (
          <LocationStep
            value={booking.location}
            onChange={(location) => setBooking({ ...booking, location })}
            onNext={nextStep}
          />
        )}
        {step === 1 && (
          <DateStep
            value={booking.date}
            onChange={(date) => setBooking({ ...booking, date })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 2 && (
          <TimeStep
            value={booking.time}
            onChange={(time) => setBooking({ ...booking, time })}
            onNext={nextStep}
            onPrev={prevStep}
            location={booking.location}
            date={booking.date}
            details={booking.details}
            routeToInitialPage={routeToInitialPage}
          />
        )}
        {step === 3 && (
          <BookAppointmentForm
            bookingDate={booking.date}
            bookingTime={booking.time}
            onBack={prevStep}
            onSubmit={handleDetailsSubmit}
            details={booking.details}
            onBooked={handleAppointmentBooked}
          />
        )}
        {step === 4 && (
          <ConfirmationStep booking={booking} onPrev={prevStep} />
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import { fetchAvailableSlots } from "../api/slots";
import DataPrivacyModal from "./DataPrivacyModal";
import { recordConsent } from "../api/consent";

export default function TimeStep({
  value,
  onChange,
  onNext,
  onPrev,
  location,
  date,
  details,
  routeToInitialPage // <-- Add this prop!
}: {
  value: string;
  onChange: (time: string) => void;
  onNext: () => void;
  onPrev: () => void;
  location: string;
  date: string;
  details: { name: string; email: string; phone: string };
  routeToInitialPage: () => void; // <-- Add this prop!
}) {
  const [time, setTime] = useState(value);
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    async function loadSlots() {
      setLoading(true);
      const available = await fetchAvailableSlots(location, date);
      setSlots(available);
      setLoading(false);
    }
    loadSlots();
  }, [location, date]);

  const handleNext = () => {
    setPrivacyOpen(true);
  };

  const handleAgree = async () => {
    setPrivacyOpen(false);
    await recordConsent({
      ...details,
      location,
      date,
      time,
      consent: true
    });
    onChange(time);
    onNext();
  };

  const handleDisagree = async () => {
    setPrivacyOpen(false);
    await recordConsent({
      ...details,
      location,
      date,
      time,
      consent: false
    });
    // Route back to initial page (LocationStep)
    routeToInitialPage();
  };

  return (
    <div>
      <h2>Select Time Slot</h2>
      {loading ? (
        <p>Loading available slots...</p>
      ) : (
        <select value={time} onChange={e => setTime(e.target.value)}>
          <option value="">--Choose a time--</option>
          {slots.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      )}
      <div>
        <button onClick={onPrev}>Back</button>
        <button
          disabled={!time}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <DataPrivacyModal
        open={privacyOpen}
        onAgree={handleAgree}
        onDisagree={handleDisagree}
      />
    </div>
  );
}
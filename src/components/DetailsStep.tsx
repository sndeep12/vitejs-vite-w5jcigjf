import React, { useState } from "react";

export default function DetailsStep({ value, onChange, onNext, onPrev }: {
  value: { name: string; email: string; phone: string };
  onChange: (details: { name: string; email: string; phone: string }) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [details, setDetails] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const valid = details.name && details.email && details.phone;

  return (
    <div>
      <h2>Your Details</h2>
      <input name="name" placeholder="Name" value={details.name} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" value={details.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={details.phone} onChange={handleChange} />
      <div>
        <button onClick={onPrev}>Back</button>
        <button disabled={!valid} onClick={() => {onChange(details); onNext();}}>Next</button>
      </div>
    </div>
  );
}
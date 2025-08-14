import React, { useState } from "react";

export default function DateStep({ value, onChange, onNext, onPrev }: {
  value: string;
  onChange: (date: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [date, setDate] = useState(value);

  return (
    <div>
      <h2>Select Date</h2>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <div>
        <button onClick={onPrev}>Back</button>
        <button disabled={!date} onClick={() => {onChange(date); onNext();}}>Next</button>
      </div>
    </div>
  );
}
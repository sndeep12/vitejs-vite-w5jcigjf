import React, { useState } from "react";

const locations = [
  "London Branch",
  "Manchester Branch",
  "Edinburgh Branch"
];

export default function LocationStep({ value, onChange, onNext }: {
  value: string;
  onChange: (location: string) => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState(value);

  return (
    <div>
      <h2>Select Location</h2>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">--Choose a branch--</option>
        {locations.map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
      <button disabled={!selected} onClick={() => {onChange(selected); onNext();}}>Next</button>
    </div>
  );
}
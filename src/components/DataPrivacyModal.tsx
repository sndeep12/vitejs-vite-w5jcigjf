import React from "react";
import "./DataPrivacyModal.css";

interface Props {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
}

export default function DataPrivacyModal({ open, onAgree, onDisagree }: Props) {
  if (!open) return null;
  return (
    <div className="privacy-modal-overlay">
      <div className="privacy-modal">
        <h2>Data Privacy</h2>
        <div className="privacy-warning">
          To proceed please agree with our Privacy policy.
        </div>
        <p>
          NatWest collects your name and mobile number to help identify you and provide you
          with updates on the progress of your service. The information is deleted after your
          appointment as per the bank's policy and no bank records are updated as a result.
        </p>
        <p>
          Our full Privacy Policy is available at natwest.com/privacy or click the link below
        </p>
        <a href="https://natwest.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy Link</a>
        <div className="privacy-buttons">
          <button className="privacy-btn privacy-disagree" onClick={onDisagree}>I do not agree</button>
          <button className="privacy-btn privacy-agree" onClick={onAgree}>I agree</button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";

const MeetingLinkModal = ({ isOpen, onClose, onSend }) => {
  const [meetingLink, setMeetingLink] = useState("");

  const handleSend = () => {
    onSend(meetingLink);
    setMeetingLink(""); // Clear the input field
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Send Meeting Link</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Meeting Link</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter the meeting link"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSend}>
            Send
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MeetingLinkModal;

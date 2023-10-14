import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingModal.css";

Modal.setAppElement("#root");

function BookingModal({ isOpen, onRequestClose, onBook }) {
  const [sessionDate, setSessionDate] = useState(null);
  const [packageType, setPackageType] = useState(3);

  const handleBookNow = () => {
    // Validate the selected date and package type
    if (sessionDate && packageType) {
      // Create a booking object with the selected data
      const booking = {
        sessionDate,
        packageType,
      };

      // Call the onBook function to book the session
      onBook(booking);

      // Close the modal
      onRequestClose();
    } else {
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="booking-modal"
    >
      <h2>Book Now</h2>
      <div className="modal-content">
        <label>Select Date:</label>
        <DatePicker
          selected={sessionDate}
          onChange={(date) => setSessionDate(date)}
          placeholderText="Select a Date"
          minDate={new Date()}
        />
        <label>Select Package:</label>
        <select
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          <option value={3}>3 Sessions</option>
          <option value={5}>5 Sessions</option>
          <option value={7}>7 Sessions</option>
        </select>
        <button className="book-button" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </Modal>
  );
}

export default BookingModal;

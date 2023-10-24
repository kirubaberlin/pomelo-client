import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Booked({ isOpen, onRequestClose, onAcceptBooking }) {
  const [jobSeekerInfo, setJobSeekerInfo] = useState({
    name: "",
    email: "",
  });

  const handleAcceptBooking = () => {
    // You can perform additional validation here
    onAcceptBooking(jobSeekerInfo);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="booking-modal"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Accept Booking</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onRequestClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="jobSeekerName" className="form-label">
                  Job Seeker Name:
                </label>
                <input
                  type="text"
                  id="jobSeekerName"
                  className="form-control"
                  value={jobSeekerInfo.name}
                  onChange={(e) =>
                    setJobSeekerInfo({ ...jobSeekerInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="jobSeekerEmail" className="form-label">
                  Job Seeker Email:
                </label>
                <input
                  type="email"
                  id="jobSeekerEmail"
                  className="form-control"
                  value={jobSeekerInfo.email}
                  onChange={(e) =>
                    setJobSeekerInfo({
                      ...jobSeekerInfo,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleAcceptBooking}>
              Accept Booking
            </button>
            <button className="btn btn-danger" onClick={onRequestClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Booked;

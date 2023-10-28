// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import DatePicker from "react-datepicker";
// import axios from "axios";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import "react-datepicker/dist/react-datepicker.css";
// import "./BookingModal.css";

// Modal.setAppElement("#root");

// function BookingModal({ isOpen, onRequestClose, consultant, jobseeker }) {
//   const [sessionDate, setSessionDate] = useState(null);
//   const [packageType, setPackageType] = useState("3");
//   const [paymentStatus, setPaymentStatus] = useState("Pending");
//   const [error, setError] = useState(null);
//   const stripe = useStripe();
//   const elements = useElements();
//   const storedToken = localStorage.getItem("authToken");

//   useEffect(() => {
//     if (consultant && consultant.paymentStatus) {
//       setPaymentStatus(consultant.paymentStatus);
//     }
//   }, [consultant]);

//   const handleProcessPayment = async () => {
//     if (sessionDate && packageType) {
//       const packageTypeNumber = parseInt(packageType, 10);
//       const amount = calculatePaymentAmount(packageType);

//       if (amount > 0) {
//         const { paymentMethod, error } = await stripe.createPaymentMethod({
//           type: "card",
//           card: elements.getElement(CardElement),
//         });

//         if (error) {
//           setError(error.message);
//           return;
//         }

//         const paymentResult = await processPayment({
//           paymentMethodId: paymentMethod.id,
//           amount,
//           currency: "usd", // Replace with your currency
//         });

//         if (paymentResult === "success") {
//           setPaymentStatus("Paid");
//           handleCreateBooking();
//         } else {
//           setError("Payment failed. Please try again.");
//         }
//       } else {
//         setError("Invalid package type");
//       }
//     } else {
//       setError("Please select a date and package type.");
//     }
//   };

//   const handleCreateBooking = () => {
//     if (consultant && jobseeker && consultant._id && jobseeker._id) {
//       axios
//         .post(
//           "http://localhost:5005/api/booking",
//           {
//             sessionDate,
//             packageType,
//             paymentStatus,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
//           }
//         )
//         .then((response) => {
//           console.log("Booking created:", response.data);
//           onRequestClose();
//         })
//         .catch((error) => {
//           console.error("Error creating booking:", error);
//           setError("Failed to create booking. Please try again.");
//         });
//     } else {
//       // Handle the case where consultant or jobseeker is not defined
//       setError("Consultant or jobseeker information is missing.");
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       className="booking-modal"
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Book Now</h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={onRequestClose}
//             ></button>
//           </div>
//           <div className="modal-body">
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="sessionDate" className="form-label">
//                   Select Date:
//                 </label>
//                 <DatePicker
//                   id="sessionDate"
//                   selected={sessionDate}
//                   onChange={(date) => setSessionDate(date)}
//                   placeholderText="Select a Date"
//                   minDate={new Date()}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="packageType" className="form-label">
//                   Select Package:
//                 </label>
//                 <select
//                   id="packageType"
//                   value={packageType}
//                   onChange={(e) => setPackageType(e.target.value)}
//                   className="form-select"
//                 >
//                   <option value="3">3 Sessions</option>
//                   <option value="5">5 Sessions</option>
//                   <option value="7">7 Sessions</option>
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">
//                   Payment Status: {paymentStatus}
//                 </label>
//               </div>
//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               )}
//               <div className="mb-3">
//                 <label htmlFor="cardDetails" className="form-label">
//                   Card Details:
//                 </label>
//                 <CardElement
//                   id="cardDetails"
//                   options={{ style: cardElementStyle }}
//                 />
//               </div>
//             </form>
//           </div>
//           <div className="modal-footer">
//             <button className="btn btn-primary" onClick={handleProcessPayment}>
//               Process Payment
//             </button>
//             <button className="btn btn-danger" onClick={onRequestClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// const cardElementStyle = {
//   base: {
//     fontSize: "16px",
//     color: "#424770",
//     "::placeholder": {
//       color: "#aab7c4",
//     },
//   },
//   invalid: {
//     color: "#9e2146",
//   },
// };

// function calculatePaymentAmount(packageType) {
//   if (packageType === "3") {
//     return 2000; // $20.00 (in cents)
//   } else if (packageType === "5") {
//     return 5000; // $50.00 (in cents)
//   } else if (packageType === "7") {
//     return 10000; // $100.00 (in cents)
//   } else {
//     return -1; // Return a negative value for an invalid package type
//   }
// }

// async function processPayment({ paymentMethodId, amount, currency }) {
//   try {
//     const response = await axios.post("http://localhost:5005/api/payment", {
//       paymentMethodId,
//       amount,
//       currency,
//     });

//     if (response.data.success) {
//       return "success";
//     } else {
//       return "failure";
//     }
//   } catch (error) {
//     console.error("Error processing payment:", error);
//     return "failure";
//   }
// }

// export default BookingModal;

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingModal.css";
import { useParams } from "react-router-dom";
import { useConsultantContext } from "../../context/consultant.context";
import { useJobSeekerContext } from "../../context/jobseeker.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { AuthContext } from "../../context/auth.context";

Modal.setAppElement("#root");

function BookingModal({ isOpen, onRequestClose, consultant }) {
  // const { consultantId, jobseekerId } = useParams();
  const [sessionDate, setSessionDate] = useState(null);
  const [packageType, setPackageType] = useState("3");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const storedToken = localStorage.getItem("authToken");
  // const { consultant } = useConsultantContext();
  const { jobSeeker } = useJobSeekerContext();
  console.log("consultant:", consultant);
  console.log("jobSeeker:", jobSeeker._id);

  useEffect(() => {
    if (consultant && consultant.paymentStatus) {
      setPaymentStatus(consultant.paymentStatus);
    }
  }, [consultant]);
  /*
  const handleProcessPayment = async () => {
    if (sessionDate && packageType) {
      const packageTypeNumber = parseInt(packageType, 10);
      const amount = calculatePaymentAmount(packageTypeNumber);

      if (amount > 0) {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        if (error) {
          setError(error.message);
          return;
        }

        const paymentResult = await processPayment({
          paymentMethodId: paymentMethod.id,
          amount,
          currency: "usd",
        });

        if (paymentResult === "success") {
          setPaymentStatus("Paid");
          handleCreateBooking();
        } else {
          setError("Payment failed. Please try again.");
        }
      } else {
        setError("Invalid package type");
      }
    } else {
      setError("Please select a date and package type.");
    }
  };
*/
  const handleCreateBooking = () => {
    if (jobSeeker && consultant && sessionDate && packageType) {
      axios
        .post(
          "http://localhost:5005/api/booking",
          {
            consultant: consultant.consultant._id,
            jobseeker: jobSeeker,
            sessionDate: sessionDate.toISOString(),
            packageType: parseInt(packageType, 10),
            paymentStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Booking created:", response.data);
          onRequestClose();
        })
        .catch((error) => {
          console.error("Error creating booking:", error);
          setError("Failed to create booking. Please try again.");
        });
    } else {
      setError(
        "Some information is missing. Please make sure you are logged in and have selected a date and package type."
      );
    }
  };
  const showSuccessToast = () => {
    toast.success(
      "Booking created successfully. Consultants will reach out soon.",
      {
        position: "top-right",
        autoClose: 50000, // Close the popup after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
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
            <h5 className="modal-title">Book Now</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onRequestClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="sessionDate" className="form-label">
                  Select Date:
                </label>
                <DatePicker
                  id="sessionDate"
                  selected={sessionDate}
                  onChange={(date) => setSessionDate(date)}
                  placeholderText="Select a Date"
                  minDate={new Date()}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="packageType" className="form-label">
                  Select Package:
                </label>
                <select
                  id="packageType"
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  className="form-select"
                >
                  <option value="3">3 Sessions</option>
                  <option value="5">5 Sessions</option>
                  <option value="7">7 Sessions</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Payment Status: {paymentStatus}
                </label>
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="cardDetails" className="form-label">
                  Card Details:
                </label>
                <CardElement
                  id="cardDetails"
                  options={{ style: cardElementStyle }}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            {/*  <button className="btn btn-primary" onClick={handleProcessPayment}>
              Process Payment
            </button>
            <button className="btn btn-danger" onClick={onRequestClose}>
              Close
            </button>
            */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Modal>
  );
}

const cardElementStyle = {
  base: {
    fontSize: "16px",
    color: "#424770",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#9e2146",
  },
};

function calculatePaymentAmount(packageType) {
  if (packageType === 3) {
    return 2000;
  } else if (packageType === 5) {
    return 5000;
  } else if (packageType === 7) {
    return 10000;
  } else {
    return -1;
  }
}
/*
async function processPayment({ paymentMethodId, amount, currency }) {
  try {
    const response = await axios.post("http://localhost:5005/api/payment", {
      paymentMethodId,
      amount,
      currency,
    });

    if (response.data.success) {
      return "success";
    } else {
      return "failure";
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return "failure";
  }
}
*/

export default BookingModal;

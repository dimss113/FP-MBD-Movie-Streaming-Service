import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import axios from "axios";

const SubscriptionPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [storedData, setStoredData] = useState(null);

  const HandleGetStoredData = () => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData) {
      console.log(storedData[0].id);
      setStoredData(storedData[0].id);
    } else {
      navigate("/login");
    }
  };

  const HandleAddSubscription = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/subscription", {
        start_date: startDate,
        end_date: endDate,
        user_id: storedData,
        status: 0,
      });
      console.log("Subscription Added");
      console.log(response);
      setShowConfirmationModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HandleGetStoredData();
  }, []);

  const navigate = useNavigate();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  const handleConfirmSubscription = () => {
    setShowConfirmationModal(false);
    navigate("/payment");
  };

  const handleCancelSubscription = () => {
    setShowConfirmationModal(false);
  };

  return (
    <Layout>
      <div className="bg-main min-h-screen flex items-center justify-center">
        <div className="bg-white shadow p-6 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-gray-900">
            Subscription Page
          </h2>
          <form onSubmit={HandleAddSubscription}>
            <div className="mb-4">
              <label
                htmlFor="start-date"
                className="block text-gray-800 border-gray-900 font-medium mb-2"
              >
                Start Date
              </label>
              <DatePicker
                id="start-date"
                selected={startDate}
                onChange={handleStartDateChange}
                className="border text-gray-800 border-gray-900 rounded px-3 py-2 w-full"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Start Date"
                minDate={new Date()}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="end-date"
                className="block text-gray-800 border-gray-900 font-medium mb-2"
              >
                End Date
              </label>
              <DatePicker
                id="end-date"
                selected={endDate}
                onChange={handleEndDateChange}
                className="border text-gray-800 border-gray-900 rounded px-3 py-2 w-full"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select End Date"
                minDate={startDate || new Date()}
              />
            </div>
            <button className="bg-main text-white py-2 px-4 rounded font-medium w-full">
              Submit
            </button>
          </form>

          {showConfirmationModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-gray-900">
                  Confirmation
                </h2>
                <p className="mb-4 text-gray-800 border-gray-900">
                  Proceed with the subscription?
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={handleCancelSubscription}
                    className="bg-red-500  text-gray-800 border-gray-900 py-2 px-4 rounded font-medium mr-2"
                  >
                    No
                  </button>
                  <button
                    onClick={handleConfirmSubscription}
                    className="bg-green-500  text-gray-800 border-gray-900 py-2 px-4 rounded font-medium"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionPage;
// text-gray-800 border-gray-900

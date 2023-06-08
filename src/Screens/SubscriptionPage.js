import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../Layout/Layout";

const SubscriptionPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    calculateTotalCost(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateTotalCost(startDate, date);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotalCost = (start, end) => {
    if (start && end) {
      const monthsDiff = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)
      );
      const cost = monthsDiff * 30000;
      setTotalCost(cost);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan startDate, endDate, paymentMethod, dan totalCost
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Payment Method:", paymentMethod);
    console.log("Total Cost:", totalCost);
  };

  return (
    <Layout>
      <div className="bg-main min-h-screen flex items-center justify-center">
        <div className="bg-white shadow p-6 rounded-lg w-96">
          <h2 className="text-2xl text-gray-800 font-bold mb-4">
            Subscription Page
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="start-date"
                className="block text-gray-800 font-medium mb-2"
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
                className="block text-gray-800 font-medium mb-2"
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
            <div className="mb-4">
              <label
                htmlFor="payment-method"
                className="block font-medium text-gray-800 mb-2"
              >
                Payment Method
              </label>
              <select
                id="payment-method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="border text-gray-800 border-gray-900 rounded px-3 py-2 w-full"
              >
                <option value="">Select Payment Method</option>
                <option value="credit-card">Credit Card</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="total-cost"
                className="block text-gray-800 font-medium mb-2"
              >
                Total Cost
              </label>
              <input
                id="total-cost"
                type="text"
                value={totalCost}
                readOnly
                className="border text-gray-800 border-gray-900 rounded px-3 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-main text-white py-2 px-4 rounded font-medium w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionPage;

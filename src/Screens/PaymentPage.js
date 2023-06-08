import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [totalCost, setTotalCost] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [storedData, setStoredData] = useState(null);
  const [subscriptionDatas, setSubscriptionDatas] = useState([]);
  const [subSdata, setSubSdata] = useState();
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const navigate = useNavigate();

  const handleGetStoredData = () => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData) {
      console.log(storedData[0].id);
      setStoredData(storedData[0].id);
    } else {
      navigate("/login");
    }
  };

  const handleGetSubscriptionDataByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/subscription/user/${storedData}`
      );
      const data = response.data.data;

      if (data.length > 0) {
        setSubscriptionDatas(data);

        const { start_date, end_date } = data[0];
        console.log(start_date, end_date);
        setStartDate(start_date);
        setEndDate(end_date);
        calculateTotalCost(start_date, end_date);
      } else {
        setSubscriptionDatas([]);
        setStartDate(null);
        setEndDate(null);
        setTotalCost(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllPaymentMethod = async () => {
    try {
      const response = await axios.get("http://localhost:5000/paymentmethod");
      setPaymentMethodData(response.data.data);
      console.log("payment method data", paymentMethodData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSubscription = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/subscription/${subSdata}`,
        {
          start_date: startDate,
          end_date: endDate,
          user_id: storedData,
          status: 1,
        }
      );
      console.log("Subscription Updated");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    console.log("payment method", paymentMethod);
    console.log("subscription id", subSdata);
    console.log("total cost", totalCost);
    const promise_ = updateSubscription(e);
    await Promise.all([promise_]);
    try {
      const response = await axios.post("http://localhost:5000/payment", {
        payment_method_id: paymentMethod,
        subscription_id: subSdata,
        total: totalCost,
        status: 1,
        payment_date: new Date(),
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetStoredData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (storedData) {
        await handleGetSubscriptionDataByUserId();
        await handleGetAllPaymentMethod();
      }
    };

    fetchData();
  }, [storedData]);

  const handleSubscriptionChange = (e) => {
    const selectedSubscriptiondata = e.target.value;
    const [start_date, end_date, subsIdString] =
      selectedSubscriptiondata.split(" ");
    console.log("Update data", start_date, end_date, subsIdString);
    const start_date_obj = new Date(start_date);
    const end_date_obj = new Date(end_date);
    const subsId = parseInt(subsIdString);
    console.log("subsId", subsId);
    setSubSdata(subsId);
    setStartDate(new Date(start_date_obj));
    setEndDate(new Date(end_date_obj));
    calculateTotalCost(start_date, end_date);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotalCost = (start_date, end_date) => {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    setStartDate(startDate);
    setEndDate(endDate);
    const monthsDiff =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    const cost = monthsDiff * 30000;
    setTotalCost(cost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Method:", paymentMethod);
    console.log("Total Cost:", totalCost);
  };

  return (
    <Layout>
      <div className="bg-main min-h-screen flex items-center justify-center">
        <div className="bg-white shadow p-6 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-gray-900">
            Payment Page
          </h2>
          <form onSubmit={handleAddPayment}>
            <div className="mb-4">
              <label
                htmlFor="subscription"
                className="block font-medium mb-2 text-gray-800 border-gray-900"
              >
                Your Subscription
              </label>
              <select
                id="subscription"
                onChange={handleSubscriptionChange}
                className="border rounded px-3 py-2 w-full text-gray-800 border-gray-900"
              >
                <option value="">Select your subs</option>
                {subscriptionDatas.map((subscriptionData) => (
                  <option
                    key={subscriptionData.id}
                    value={`${
                      new Date(subscriptionData.start_date)
                        .toISOString()
                        .split("T")[0]
                    } ${
                      new Date(subscriptionData.end_date)
                        .toISOString()
                        .split("T")[0]
                    } ${subscriptionData.id}`}
                  >
                    {
                      new Date(subscriptionData.start_date)
                        .toISOString()
                        .split("T")[0]
                    }{" "}
                    until{" "}
                    {
                      new Date(subscriptionData.end_date)
                        .toISOString()
                        .split("T")[0]
                    }
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="payment-method"
                className="block font-medium mb-2 text-gray-800 border-gray-900"
              >
                Payment Method
              </label>
              <select
                id="payment-method"
                className="border rounded px-3 py-2 w-full text-gray-800 border-gray-900"
                onChange={handlePaymentMethodChange}
              >
                <option value="">Select method</option>
                {paymentMethodData.map((singlePayment, index) => (
                  <option key={index} value={singlePayment.id}>
                    {singlePayment.method}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="total-cost"
                className="block font-medium mb-2 text-gray-800 border-gray-900"
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
            <button className="bg-main text-white py-2 px-4 rounded font-medium w-full">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;

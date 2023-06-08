import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../SideBar";
import Table from "../../../Components/Table";
import { HiPlus } from "react-icons/hi";
import TableCategory from "../../../Components/TableCategory";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import PaymentModal from "../../../Components/Modals/PaymentModal";

const PaymentMethod = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentMethodData, setPaymentMethodData] = useState([]);

  const HandleGetAllPaymentMethod = async () => {
    try {
      const response = await axios.get("http://localhost:5000/paymentmethod");
      console.log(response.data.data);
      setPaymentMethodData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const onEditFunction = (id) => {
    setPaymentMethod(id);
    setModalOpen(!modalOpen);
  };

  const HandleDeletePaymentMethod = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/paymentmethod/${id}`);
      setModalOpen(false);
      // reload window
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (modalOpen === false) {
      setPaymentMethod();
    }
  }, [modalOpen]);

  useEffect(() => {
    HandleGetAllPaymentMethod();
  }, []);

  return (
    <SideBar>
      <PaymentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        payment_method={paymentMethod}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Payment Method</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded "
          >
            <HiPlus className="text-white" /> Create
          </button>
        </div>
        <TableCategory
          datas={paymentMethodData}
          users={false}
          ageRate={false}
          casts={false}
          moviestat={false}
          paymentMethod={true}
          onEditFunction={onEditFunction}
          onDeleteFunction={HandleDeletePaymentMethod}
        />
      </div>
    </SideBar>
  );
};

export default PaymentMethod;

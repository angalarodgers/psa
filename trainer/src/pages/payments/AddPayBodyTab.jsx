import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import toast, { Toaster } from "react-hot-toast";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useQuery } from "react-query";

const AddPayBodyTab = () => {
  const [inputs, setInputs] = useState({
    customer: null,
    amount: null,
    payment_method: "",
    date: null,
  });

  const [er, setEr] = useState("");
  const [suc, setSuc] = useState("");
  const { isLoading, error, data } = useQuery("getMyUsers", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      return res.data;
    })
  );

  const handleAddChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (inputs.customer === null) {
      toast.error("Customer reqyured!");
      setEr("Please Select a Customer!");
    } else if (inputs.amount < 5) {
      toast.error("Amount Can not be less than 5!");
      setEr("Amount Can not be less than 5!");
    } else {
      toast.success("Submitting...");
      setEr("");
      setSuc("Submitting...");
      try {
        const ress = await makeRequest.post("/pay/addPay", inputs);
        if (ress.status === 200) {
          toast.success("Order Successfully Created!");
          setSuc("Payment Successfully Added!");
          await sleep(3000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="row">
      <div className="col-sm-2"></div>
      <div className="col-sm-8">
        <form role="form text-left p-5">
          <div className="form-group"></div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Customer</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              name="customer"
              onChange={handleAddChange}
            >
              <option value={null} selected disabled>
                Select Customer
              </option>
              {error
                ? "Something Went Wring"
                : isLoading
                ? "Loading"
                : data.map((customer) => (
                    <option value={customer.id} key={customer.id}>
                      {customer.id}, Name: {customer.username}, Email:{" "}
                      {customer.email}
                    </option>
                  ))}
            </select>
          </div>

          <label>Amount</label>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              aria-label="Email"
              aria-describedby="email-addon"
              name="amount"
              onChange={handleAddChange}
              value={inputs.amount}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Payment Method</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              name="payment_method"
              onChange={handleAddChange}
              value={inputs.payment_method}
            >
              <option>PayPal</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Crypto</option>
              <option>M-Pesa</option>
              <option>Airtel Money</option>
            </select>
          </div>

          <label>Date</label>
          <div className="input-group mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              name="date"
              onChange={handleAddChange}
              value={inputs.date}
            />
          </div>

          <div className="text-center">
            <span style={{ color: "red" }}>{er && er}</span>
            <span style={{ color: "green" }}>{suc && suc}</span>
            <button
              type="button"
              className="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
              onClick={handleAddSubmit}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddPayBodyTab;

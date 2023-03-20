import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const AddPayBodyTab = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="row">
      <div className="col-sm-2"></div>
      <div className="col-sm-8">
        <form role="form text-left p-5">
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Customer</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option value={currentUser.id}>{currentUser.username}</option>
            </select>
          </div>

          <label>Amount</label>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              aria-label="Amount"
              aria-describedby="email-addon"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Payment Method</label>
            <select className="form-control" id="exampleFormControlSelect1">
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
              placeholder="date"
              aria-label="date"
              aria-describedby="password-addon"
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayBodyTab;

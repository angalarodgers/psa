import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Main = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    fullNames: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };
  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputs.username.length === 0) {
      toast.error("Email is required!", {
        icon: " 🙂 ",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else if (inputs.password.length === 0) {
      toast.error("Password is required!");
    } else {
      const res = await login(inputs);

      if (res.status === 200) {
        toast.success("Logged In Successfully!");
        navigate("/dashboard");
      } else if (res.response.status == 404) {
        toast.error(res.response.data);
      } else {
        toast.error(res.response.data);
      }
    }
  };

  const read = async (event) => {
    event.preventDefault();

    const res = await axios
      .post("http://localhost:5000/api/auth/saveAsRead", inputs)
      .then((response) => {
        console.log(response);
        toast.success("Saved!");
      })
      .catch((error) => console.log(error));
  };
  return (
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-6">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      Dear Customer | Welcome
                    </h3>
                    <p className="mb-0">
                      Enter your email and password to sign in
                    </p>
                  </div>
                  <div className="card-body">
                    <form role="form">
                      <label>Username</label>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="username"
                          aria-label="Email"
                          aria-describedby="email-addon"
                          name="username"
                          onChange={handleChange}
                          value={inputs.username}
                          autocomplete="off"
                        />
                      </div>
                      <label>Password</label>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="password-addon"
                          name="password"
                          onChange={handleChange}
                          value={inputs.password}
                        />
                      </div>
                      <div className="form-check form-switch">
                        <a href="forgot-password">Forgot Password</a>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn bg-gradient-info w-100 mt-4 mb-0"
                          onClick={handleLogin}
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto">
                      Don't have an account?{" "}
                      <a
                        href="register"
                        className="text-info text-gradient font-weight-bold"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 ">
                <p
                  className="card p-3 mt-7"
                  style={{ height: "80vh", overflow: "scroll" }}
                >
                  <p className="">
                    <h6 className="font-weight-bolder text-info text-gradient">
                      Here are our Terms & Conditions to direct you on our
                      operations and policies;{" "}
                    </h6>
                  </p>
                  <ol>
                    <li className="fs-13">
                      <small>
                        Every client should not cancel a lesson more than three
                        times failure to which the lesson will be counted as
                        done.
                      </small>
                      <ul>
                        <li>
                          <small>No more than 3 cancellations allowed.</small>
                        </li>
                        <li>
                          <small>
                            Failure to comply will result in lesson counted as
                            done.
                          </small>
                        </li>
                      </ul>
                    </li>
                    <li className="fs-13">
                      <small>
                        Lack of communication during a cancellation will be
                        treated as a lesson done.
                      </small>
                      <ul>
                        <li>
                          <small>
                            Communication must be made during a cancellation.
                          </small>
                        </li>
                        <li>
                          <small>
                            Lack of communication will result in lesson counted
                            as done.
                          </small>
                        </li>
                      </ul>
                    </li>
                    <li className="fs-13">
                      <small>
                        As per our membership form, all the 10 lessons should be
                        completed within a period of one month and one week.
                      </small>
                      <ul>
                        <li>
                          <small>
                            10 lessons to be completed in 1 month and 1 week.
                          </small>
                        </li>
                      </ul>
                    </li>
                    <li className="fs-13">
                      <small>
                        After every cancellation, a makeup class needs to be
                        planned for within the period stated in the form.
                      </small>
                      <ul>
                        <li>
                          <small>
                            Makeup class to be planned after cancellation.
                          </small>
                        </li>
                        <li>
                          <small>Within the period stated in the form.</small>
                        </li>
                      </ul>
                    </li>
                    <li className="fs-13">
                      <small>
                        We are flexible by accepting a cancellation in case of
                        unavoidable circumstances. Therefore during a makeup
                        class, the parent or adult should be flexible to be
                        given a different time according to the availability in
                        our diary and avoid demanding for same time he or she
                        was booked unless the slot is free.
                      </small>
                      <ul>
                        <li>
                          <small>
                            Cancellations accepted for unavoidable
                            circumstances.
                          </small>
                        </li>
                        <li>
                          <small>
                            Flexibility required for makeup class time.
                          </small>
                        </li>
                        <li>
                          <small>
                            Do not demand same time unless slot is free.
                          </small>
                        </li>
                      </ul>
                    </li>
                    <li className="fs-13">
                      <small>
                        A lesson goes for an hour for adults and 45 minutes for
                        kids, therefore all clients should keep time. If you
                        come late, your lesson shall be conducted within the
                        period remaining without any extension.
                      </small>
                      <ul>
                        <li>
                          <small>
                            Lesson duration is 1 hour for adults, 45 minutes for
                            kids.
                          </small>
                        </li>
                        <li>
                          <small>Arrive on time.</small>
                        </li>
                        <li>
                          <small>
                            No extension of lesson time for late arrival.
                          </small>
                        </li>
                      </ul>
                    </li>
                    <li className="fs-13">
                      <small>
                        If you are enrolling or you wish to renew for swimming
                        lessons, kindly make up-front payment in full for us to
                        book your slots accordingly in our diary.
                      </small>
                      <ul>
                        <li>
                          <small>
                            Full payment required for enrollment or renewal.
                          </small>
                        </li>
                        <li>
                          <small>
                            Slots will be booked upon receipt of payment.
                          </small>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <small>
                        {" "}
                        All payments are non-refundable because some clients
                        don't attend lessons for a long period of time, then
                        demand for specific times when they resume and end up
                        asking for refund which we will not accept.
                      </small>
                      <ul>
                        <li>
                          <small>All payments non-refundable.</small>
                        </li>
                        <li>
                          <small>
                            {" "}
                            Refunds not accepted due to long absence and demand
                            for specific times.
                          </small>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <small>
                        Any time you come for a lesson, make sure you sign the
                        attendance sheet for your records and the academy's
                        records.
                      </small>
                      <ul>
                        <li>
                          <small>Sign attendance sheet upon arrival.</small>
                        </li>
                        <li>
                          <small>For personal and academy records.</small>
                        </li>
                      </ul>
                    </li>
                  </ol>
                  <p>
                    <small className="font-weight-bolder text-info text-gradient">
                      Swimming is a sport which needs consistency to achieve
                      your goals for choosing to learn the swimming skills,
                      therefore a lot of cancellations not only affects our
                      program but the swimmer's progress.
                    </small>
                  </p>
                  <p className="font-weight-bolder text-info text-gradient">
                    <small>
                      {" "}
                      Kindly go through all matters discussed above then sign
                      below to commit yourself.
                    </small>
                  </p>
                  <p className="font-weight-bolder text-info text-gradient">
                    <small>
                      {" "}
                      Write your name as a confirmation of conforming to your
                      terms and conditions
                    </small>
                  </p>
                  <p>
                    <form>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Full Names
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Full Names"
                          name="fullNames"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={read}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default Main;

import React from "react";

const Terms = () => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">
          Here are our Terms & Conditions to direct you on our operations and
          policies
        </h5>
        <button
          type="button"
          className="btn-close text-dark"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p>
          <ol>
            <li className="fs-13">
              <small>
                Every client should not cancel a lesson more than three times
                failure to which the lesson will be counted as done.
              </small>
              <ul>
                <li>
                  <small>No more than 3 cancellations allowed.</small>
                </li>
                <li>
                  <small>
                    Failure to comply will result in lesson counted as done.
                  </small>
                </li>
              </ul>
            </li>
            <li className="fs-13">
              <small>
                Lack of communication during a cancellation will be treated as a
                lesson done.
              </small>
              <ul>
                <li>
                  <small>
                    Communication must be made during a cancellation.
                  </small>
                </li>
                <li>
                  <small>
                    Lack of communication will result in lesson counted as done.
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
                After every cancellation, a makeup class needs to be planned for
                within the period stated in the form.
              </small>
              <ul>
                <li>
                  <small>Makeup class to be planned after cancellation.</small>
                </li>
                <li>
                  <small>Within the period stated in the form.</small>
                </li>
              </ul>
            </li>
            <li className="fs-13">
              <small>
                We are flexible by accepting a cancellation in case of
                unavoidable circumstances. Therefore during a makeup class, the
                parent or adult should be flexible to be given a different time
                according to the availability in our diary and avoid demanding
                for same time he or she was booked unless the slot is free.
              </small>
              <ul>
                <li>
                  <small>
                    Cancellations accepted for unavoidable circumstances.
                  </small>
                </li>
                <li>
                  <small>Flexibility required for makeup class time.</small>
                </li>
                <li>
                  <small>Do not demand same time unless slot is free.</small>
                </li>
              </ul>
            </li>
            <li className="fs-13">
              <small>
                A lesson goes for an hour for adults and 45 minutes for kids,
                therefore all clients should keep time. If you come late, your
                lesson shall be conducted within the period remaining without
                any extension.
              </small>
              <ul>
                <li>
                  <small>
                    Lesson duration is 1 hour for adults, 45 minutes for kids.
                  </small>
                </li>
                <li>
                  <small>Arrive on time.</small>
                </li>
                <li>
                  <small>No extension of lesson time for late arrival.</small>
                </li>
              </ul>
            </li>
            <li className="fs-13">
              <small>
                If you are enrolling or you wish to renew for swimming lessons,
                kindly make up-front payment in full for us to book your slots
                accordingly in our diary.
              </small>
              <ul>
                <li>
                  <small>
                    Full payment required for enrollment or renewal.
                  </small>
                </li>
                <li>
                  <small>Slots will be booked upon receipt of payment.</small>
                </li>
              </ul>
            </li>
            <li>
              <small>
                {" "}
                All payments are non-refundable because some clients don't
                attend lessons for a long period of time, then demand for
                specific times when they resume and end up asking for refund
                which we will not accept.
              </small>
              <ul>
                <li>
                  <small>All payments non-refundable.</small>
                </li>
                <li>
                  <small>
                    {" "}
                    Refunds not accepted due to long absence and demand for
                    specific times.
                  </small>
                </li>
              </ul>
            </li>
            <li>
              <small>
                Any time you come for a lesson, make sure you sign the
                attendance sheet for your records and the academy's records.
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
            <small>
              Swimming is a sport which needs consistency to achieve your goals
              for choosing to learn the swimming skills, therefore a lot of
              cancellations not only affects our program but the swimmer's
              progress.
            </small>
          </p>
          <p>
            <small>
              {" "}
              Kindly go through all matters discussed above then sign below to
              commit yourself.
            </small>
          </p>
          <p>
            <small>
              {" "}
              Write your name as a confirmation of conforming to your terms and
              conditions
            </small>
          </p>
        </p>
      </div>
      <div className="modal-footer"></div>
    </div>
  );
};

export default Terms;

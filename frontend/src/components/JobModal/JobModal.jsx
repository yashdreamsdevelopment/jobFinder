import { useEffect, useState, useContext } from "react";
import Modal from "../Modal/Modal";
import style from "./style.module.css";
import { JobContext } from "../../context/job/JobContext";
import { ToastContext } from "../../context/toast/ToastContext";

const JobModal = ({ onClose }) => {
  const { setJobs } = useContext(JobContext);
  const { notify } = useContext(ToastContext);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateData = () => {
    const errObj = {};

    if (formData?.company?.length < 2) {
      errObj.company = "Company name must be greater than 2 characters";
    }

    if (formData?.position?.length < 5) {
      errObj.position = "Position must be greater than 5 characters";
    }

    setErrors(errObj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/jobs/", {
        method: "POST",
        type: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        notify(data.msg, "success");
        setJobs((prevJobs) => [...prevJobs, data.data]);
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        notify(data.msg, "error");
      }
    } catch (err) {
      console.log(err);
      notify("something went wrong", "error");
    }
  };

  useEffect(() => {
    const validateTimout = setTimeout(() => {
      validateData();
    }, 1000);

    return () => {
      clearInterval(validateTimout);
    };
  }, [formData]);

  return (
    <Modal onClose={onClose}>
      <div>
        <h1>Post a Job</h1>
      </div>
      <div className={style.FormContainer}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Company</label>
            <input
              type="text"
              name="company"
              placeholder="enter your company name"
              value={formData.company || ""}
              onChange={handleOnChange}
              required
            />
          </div>
          {errors.company && (
            <span className="field-error-msg">{errors.company}</span>
          )}

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              name="position"
              placeholder="enter vacant position"
              value={formData.position || ""}
              onChange={handleOnChange}
              required
            />
          </div>
          {errors.position && (
            <span className="field-error-msg">{errors.position}</span>
          )}

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              defaultValue={"interview"}
              onChange={handleOnChange}
            >
              <option value="interview">interview</option>
              <option value="declined">declined</option>
              <option value="pending">pending</option>
            </select>
          </div>
          {errors.status && (
            <span className="field-error-msg">{errors.status}</span>
          )}

          <div className="form-group">
            <button type="submit" className="button">
              Add Job
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default JobModal;

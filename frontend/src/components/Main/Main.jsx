import { Suspense, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";

import style from "./style.module.css";
import JobModal from "../JobModal/JobModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import JobCard from "../JobCard/JobCard";

import { JobContext, withJobProvider } from "../../context/job/JobContext";
import { UserContext } from "../../context/user/UserContext";

import getAllJobs from "../../services/jobs.getJobs";
import { ToastContext } from "../../context/toast/ToastContext";

const Main = () => {
  const { jobs, setJobs } = useContext(JobContext);
  const { user } = useContext(UserContext);
  const { notify } = useContext(ToastContext);

  const navigation = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleShowAddModal = () => setShowAddModal(true);

  const onClose = (modalType) => {
    const obj = {
      addModal: () => setShowAddModal(false),
      deleteModal: () => setShowDeleteModal(false),
    };

    return obj[modalType];
  };

  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    try {
      const { success, result, msg, data } = await getAllJobs({ token });

      if (success) {
        setJobs(data);
      } else {
        toast("something went wrong", "error");
      }
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "" || !user) {
      navigation("/", { replace: true });
    }

    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />

      <Suspense fallback={<Loader />}>
        <div className={style.Container} style={{}}>
          <button className="button" onClick={handleShowAddModal}>
            ADD JOB
          </button>

          <h3>Total Jobs: {jobs.length}</h3>
        </div>

        <div className={style.Container}>
          {jobs.map((job) => (
            <JobCard {...job} />
          ))}
        </div>

        {showAddModal && <JobModal onClose={onClose("addModal")} />}
        {showDeleteModal && <DeleteModal onClose={onClose("deleteModal")} />}
      </Suspense>
    </>
  );
};

export default withJobProvider(Main);

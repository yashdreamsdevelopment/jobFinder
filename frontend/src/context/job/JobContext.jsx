import { useState, createContext } from "react";

export const JobContext = createContext(null);

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export const withJobProvider = (Component) => {
  return (props) => {
    return (
      <JobProvider>
        <Component {...props} />
      </JobProvider>
    );
  };
};

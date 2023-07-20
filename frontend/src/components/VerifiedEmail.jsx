import Loader from "./Loader/Loader";
import { Link } from "react-router-dom";

const VerifiedEmail = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>

      {title === "Link Expired" && (
        <Link to={"/"} replace={true} className="button">
          Go Home
        </Link>
      )}

      {title === "Account Verified" && (
        <>
          <Loader />
          <p>Getting you in...</p>
        </>
      )}
    </div>
  );
};

export default VerifiedEmail;

import { Link } from "react-router-dom";
import styles from "./style.module.css";

import { UserContext } from "../../context/user/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <header className={styles.Header}>
      <div className={styles.Container}>
        <div className="Brand__Img__Container">
          <Link to={"/main"}>
            <h2>Job Finder 💼</h2>
          </Link>
        </div>

        <button className="button button__primary">
          {user?.name} <span className={styles.DropdownIcon}></span>{" "}
          <div className="dropdown">
            <ul>
              <li>
                <a href="#">Your jobs</a>
              </li>
              <li>
                <a href="#">Account</a>
              </li>
              <li>
                <a href="#" className="button">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

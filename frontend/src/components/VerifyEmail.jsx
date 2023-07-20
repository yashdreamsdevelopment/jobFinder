import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import ToVerifyEmail from "./ToVerifyEmail";
import VerifiedEmail from "./VerifiedEmail";

const VerifyEmail = ({ toast }) => {
  const [searchParams] = useSearchParams();
  const [isVerifing, setIsVerifing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [data, setData] = useState({});
  const shouldCallApi = useRef(true);

  const navigate = useNavigate();

  const confettiSettings = {
    width: window.innerWidth,
    height: window.innerHeight,
    numberOfPieces: 500,
    gravity: 0.3,
    wind: 0,
    tweenDuration: 1000,
  };

  const verify = async () => {
    setIsVerifing(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/verify/${searchParams.get("token")}`
      );

      const data = await response.json();

      setData(data);
      if (!data.success) setIsVerifing(false);

      if (data.success) {
        toast(data.msg, "success");
        setShowConfetti(true);
        setIsVerifing(false);
        setTimeout(() => {
          setShowConfetti(false);
          localStorage.setItem("token", data.token);
          navigate("/main", { replace: true });
        }, 2000);
      } else {
        setIsVerifing(false);
        toast(data.msg, "error");
      }
    } catch (error) {
      console.log(error);
      setIsVerifing(false);
      toast("Something went wrong...", "error");
    }
  };

  useEffect(() => {
    if (searchParams.get("token") && shouldCallApi.current) {
      shouldCallApi.current = false;
      verify();
    }
  }, []);

  return (
    <>
      {showConfetti && <Confetti {...confettiSettings} />}

      {Object.keys(data).length === 0 && <ToVerifyEmail />}

      {Object.keys(data).length > 0 && <VerifiedEmail title={data.msg} />}
    </>
  );
};

export default VerifyEmail;

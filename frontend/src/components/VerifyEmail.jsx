import { useEffect, useState } from "react";
import { useAsyncError, useNavigate, useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";

const VerifyEmail = ({ toast }) => {
  const [searchParams] = useSearchParams();
  const [isVerifing, setIsVerifing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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

      console.log(data);

      if (data.success) {
        setShowConfetti(true);

        setTimeout(() => {
          toast(data.msg, "success");

          localStorage.setItem("token", data.token);

          setShowConfetti(false);
          navigate("/main");

          // console.log("NAVIGATING TO MAIN /MAIN");
        }, 5000);
      } else {
        toast(data.msg, "error");
        setIsVerifing(false);
        navigate("/");
        // console.log("NAVIGATION TO HOME /");
      }
    } catch (error) {
      console.log(error);
      setIsVerifing(false);
    }
  };

  useEffect(() => {
    console.log("INSIDE USEEFFECT HOOK");
    if (searchParams.get("token") && !isRaned) {
      console.log("CALLING VERIFY API");
      verify();
    } else {
      console.log("NO TOKEN NO API CALL");
    }
  }, []);

  // const toggleConfettiState = () => setShowConfetti(!showConfetti);

  // const toggleVerifingState = () => setIsVerifing(!isVerifing);

  return (
    <div>
      {showConfetti && <Confetti {...confettiSettings} />}
      <h1>{isVerifing ? "Verifying" : "Verify"} your email</h1>
      <p>Almost there! We've sent a verification email to &lt; Email &gt;,</p>
      <p>You need to verify you email address to log into Job Finder</p>

      <p>
        <code>05:00</code>
      </p>

      <button className="button">
        {isVerifing ? "Verifying..." : "Resend Mail"}
      </button>
    </div>
  );
};

export default VerifyEmail;

import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "") {
      navigation("/");
    } else {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <h1>Main</h1>
    </Suspense>
  );
};

export default Main;

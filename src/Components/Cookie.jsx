import { useState, useEffect } from "react";

export default function Cookie({ cookies, setCookies, cookiesPerSecond }) {
  const [currentImage, setCurrentImage] = useState(0);

  const cookieImages = [
    "/Cookie 1-edit.png",
    "/Cookie 2-edit.png",
    "/Cookie 3-edit.png",
    "/Cookie 4-edit.png",
    "/Cookie 5-edit.png",
    "/Cookie 6-edit.png",
    "/Cookie 7-edit.png",
    "/Cookie 8-edit.png",
  ];

  const handleCookieClick = () => {
    const newCookieCount = cookies + 1;
    setCookies(newCookieCount);
    localStorage.setItem("cookies", newCookieCount);
    setCurrentImage((currentImage + 1) % cookieImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newCookieCount = cookies + cookiesPerSecond;
      // console.log(newCookieCount);
      // console.log(
      //   "current cookies:",
      //   cookies,
      //   " Cookies per second:",
      //   cookiesPerSecond
      // );
      setCookies(newCookieCount);
      localStorage.setItem("cookies", Number(newCookieCount));
      localStorage.setItem("cookiesPerSecond", Number(cookiesPerSecond));
    }, 1000);

    return () => clearInterval(interval);
  }, [cookies]);

  return (
    <div className="cookieBox">
      <p>Cookies: {cookies}</p>
      <img
        src={cookieImages[currentImage]}
        alt="Cookie"
        onClick={handleCookieClick}
      />
    </div>
  );
}

import { useState, useEffect } from "react";

export default function Cookie({ cookies, setCookies, cookiesPerSecond }) {
  const [currentImage, setCurrentImage] = useState(0);

  const cookieImages = [
    "/cookie 1.PNG",
    "/cookie 2.PNG",
    "/cookie 3.PNG",
    "/cookie 4.PNG",
    "/cookie 5.PNG",
    "/cookie 6.PNG",
    "/cookie 7.PNG",
    "/cookie 8.PNG",
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
    <div>
      <p>Cookies: {cookies}</p>
      <img
        src={cookieImages[currentImage]}
        alt="Cookie"
        onClick={handleCookieClick}
      />
    </div>
  );
}

import { useState, useEffect } from "react";

export default function Cookie({
  cookies,
  setCookies,
  cookiesPerSecond,
  cookiesPerClick,
  boughtUpgrades,
}) {
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

  const upgradeImages = {
    "Auto-Clicker": "Autoclicker.png",
    "Enhanced Oven": "Enhanced Oven.png",
    "Cookie Farm": "Cookie Farm.png",
    "Robot Baker": "Robot Baker.png",
    "Cookie Factory": "Cookie Factory.png",
    "Magic Flour": "Magic Flour.png",
    "Time Machine": "Time Machine.png",
    "Quantum Oven": "Quantum Oven.png",
    "Alien Technology": "Alien Technology.png",
    "Interdimensional Baker": "Interdimensional Baker.png",
  };

  const handleCookieClick = () => {
    const newCookieCount = cookies + cookiesPerClick;
    setCookies(newCookieCount);
    localStorage.setItem("cookies", newCookieCount);
    setCurrentImage((currentImage + 1) % cookieImages.length);
  };

  // Trigger pulse animation when the cookie count changes
  useEffect(() => {
    const numberElement = document.getElementById("number");
    if (numberElement) {
      numberElement.classList.add("pulse");
      const timer = setTimeout(() => {
        numberElement.classList.remove("pulse");
      }, 600); // Match the duration of the pulse animation (0.6s)

      return () => clearTimeout(timer); // Clean up the timeout
    }
  }, [cookies]); // Run this effect every time the cookie count changes

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((prevCookies) => {
        const newCookieCount = prevCookies + cookiesPerSecond;
        localStorage.setItem("cookies", newCookieCount);
        return newCookieCount;
      });
      localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [cookiesPerSecond, setCookies]);

  return (
    <div className="cookieBox">
      <p id="number">Cookies: {cookies}</p>
      <img
        src={cookieImages[currentImage]}
        alt="Cookie"
        onClick={handleCookieClick}
        className="cookieImage"
      />
      <div>
        <h3>Upgrades</h3>
        <div className="upgradeDisplay">
          {Object.keys(upgradeImages).map((upgradeName, index) => {
            const hasBeenBought = boughtUpgrades[index] > 0;
            return (
              <div key={upgradeName}>
                <img
                  src={upgradeImages[upgradeName]}
                  alt={upgradeName}
                  className={hasBeenBought ? "" : "hidden"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

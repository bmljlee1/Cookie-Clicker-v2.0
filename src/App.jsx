import { useState, useEffect } from "react";
import Upgrade from "./Components/Upgrade";
import Cookie from "./Components/Cookie";
import "./App.css";

function App() {
  const [cookiesPerSecond, setCookiesPerSecond] = useState(() => {
    const savedCPS = Number(localStorage.getItem("cookiesPerSecond"));
    return savedCPS || 1;
  });

  const [cookiesPerClick, setCookiesPerClick] = useState(() => {
    const savedCPC = Number(localStorage.getItem("cookiesPerClick"));
    return savedCPC || 1;
  });

  const [cookies, setCookies] = useState(() => {
    const savedCookies = Number(localStorage.getItem("cookies"));
    return savedCookies || 0;
  });

  const [boughtUpgrades, setBoughtUpgrades] = useState(() => {
    const savedBoughtUpgrades = JSON.parse(
      localStorage.getItem("boughtUpgrades")
    );
    return savedBoughtUpgrades || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  });

  useEffect(() => {
    localStorage.setItem("cookies", cookies);
  }, [cookies]);

  useEffect(() => {
    localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
  }, [cookiesPerSecond]);

  useEffect(() => {
    localStorage.setItem("cookiesPerClick", cookiesPerClick);
  }, [cookiesPerClick]);

  useEffect(() => {
    localStorage.setItem("boughtUpgrades", JSON.stringify(boughtUpgrades));
  }, [boughtUpgrades]);

  useEffect(() => {
    const appElement = document.querySelector(".App");
    if (appElement) {
      appElement.style.backgroundImage = 'url("/background-image.jpg")';
    }
  }, []);

  const resetCookies = () => {
    setCookies(0);
    setCookiesPerSecond(1);
    setBoughtUpgrades([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    localStorage.setItem("cookies", 0);
    localStorage.setItem("cookiesPerSecond", 1);
    localStorage.setItem(
      "boughtUpgrades",
      JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0])
    );
  };

  const resetBackground = () => {
    const appElement = document.querySelector(".App");
    if (appElement) {
      appElement.style.backgroundImage = 'url("/background-image.jpg")';
    }
  };

  return (
    <>
      <div className="App" id="root">
        <div className="mainContent">
          <h1>Cookie Clicker v2.0</h1>
          <button onClick={resetCookies} className="resetButton">
            Reset Cookies and Upgrades
          </button>{" "}
          <button onClick={resetBackground} className="resetButton">
            Reset Background
          </button>
          <div className="cookieContainer">
            <Cookie
              cookies={cookies}
              setCookies={setCookies}
              cookiesPerSecond={cookiesPerSecond}
              cookiesPerClick={cookiesPerClick}
              boughtUpgrades={boughtUpgrades}
            />
          </div>
        </div>
        <div className="upgradeContainer">
          <Upgrade
            cookies={cookies}
            setCookies={setCookies}
            cookiesPerSecond={cookiesPerSecond}
            setCookiesPerSecond={setCookiesPerSecond}
            boughtUpgrades={boughtUpgrades}
            setBoughtUpgrades={setBoughtUpgrades}
          />
        </div>
      </div>
    </>
  );
}

export default App;

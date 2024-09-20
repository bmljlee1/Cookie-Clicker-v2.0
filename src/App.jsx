import Upgrade from "./Components/Upgrade";
import Cookie from "./Components/Cookie";
import { useState } from "react";
import "./App.css";

function App() {
  const [cookiesPerSecond, setCookiesPerSecond] = useState(1);
  const [cookies, setCookies] = useState(() => {
    const savedCookies = JSON.parse(localStorage.getItem("cookies"));
    const checkCookies = savedCookies ? Number(savedCookies) : 100;
    console.log("cookies loaded from localStorage:", checkCookies);
    return checkCookies;
  });
  return (
    <>
      <div className="App">
        <h1>Cookie Clicker v2.0</h1>
        <Upgrade
          cookies={cookies}
          setCookies={setCookies}
          cookiesPerSecond={cookiesPerSecond}
          setCookiesPerSecond={setCookiesPerSecond}
        />
        <Cookie
          cookies={cookies}
          setCookies={setCookies}
          cookiesPerSecond={cookiesPerSecond}
          setCookiesPerSecond={setCookiesPerSecond}
        />
      </div>
    </>
  );
}

export default App;

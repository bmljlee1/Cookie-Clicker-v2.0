import { useState, useEffect } from "react";

export default function Upgrade({
  cookies,
  setCookies,
  setCookiesPerSecond,
  cookiesPerSecond,
}) {
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    const fetchUpgrades = async () => {
      const response = await fetch(
        "https://cookie-upgrade-api.vercel.app/api/upgrades"
      );
      const data = await response.json();
      setUpgrades(data);
    };

    fetchUpgrades();
  }, []);

  const handleUpgradeClick = (upgrade) => {
    console.log("Upgrade clicked:", upgrade);
    console.log("Current cookies:", cookies, "upgrade cost:", upgrade.cost);
    if (cookies >= upgrade.cost) {
      setCookies(Number(Number(cookies) - Number(upgrade.cost)));
      setCookiesPerSecond(cookiesPerSecond + upgrade.value);
      console.log(
        "type of cookies after upgrade",
        typeof Number(cookies - upgrade.cost)
      );
    }
  };

  return (
    <div className="upgradeContainer">
      <h2>Available Upgrades</h2>
      <ul>
        {upgrades.map((upgrade) => (
          <li key={upgrade.id}>
            <p>
              {upgrade.name}: {upgrade.description}
            </p>
            <button
              onClick={function () {
                handleUpgradeClick(upgrade);
              }}
            >
              upgrade
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

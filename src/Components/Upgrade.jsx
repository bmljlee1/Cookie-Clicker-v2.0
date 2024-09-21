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
    const upgradeCost = Number(upgrade.cost);
    const upgradeIncrease = Number(upgrade.increase);

    console.log("Upgrade clicked:", upgrade);
    console.log("Current cookies:", cookies, "upgrade cost:", upgradeCost);

    if (cookies >= upgradeCost) {
      setCookies(cookies - upgradeCost);

      setCookiesPerSecond(cookiesPerSecond + upgradeIncrease);
      console.log(
        "New cookies per second:",
        cookiesPerSecond + upgradeIncrease
      );
    }
  };

  return (
    <div>
      <h2>Available Upgrades</h2>
      <div className="upgradeWrapper">
        {upgrades.map((upgrade) => (
          <div key={upgrade.id} className="buyUpgrades">
            <p>
              {upgrade.name}: {upgrade.description}
              <br />
              Cost: {upgrade.cost} cookies
              <br />
              Increases CPS by: {upgrade.increase}
            </p>
            <button
              onClick={function () {
                handleUpgradeClick(upgrade);
              }}
            >
              Buy Upgrade
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

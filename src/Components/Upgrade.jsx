import { useState, useEffect } from "react";

export default function Upgrade({
  cookies,
  setCookies,
  setCookiesPerSecond,
  cookiesPerSecond,
  boughtUpgrades,
  setBoughtUpgrades,
}) {
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    const fetchUpgrades = async () => {
      try {
        const response = await fetch(
          "https://cookie-upgrade-api.vercel.app/api/upgrades"
        );
        const data = await response.json();
        setUpgrades(data);
      } catch (error) {
        console.error("Failed to fetch upgrades:", error);
      }
    };

    fetchUpgrades();
  }, []);

  const calculateUpgradeCost = (baseCost, timesBought) => {
    return Math.round(baseCost * Math.pow(1.1, timesBought));
  };

  const handleUpgradeClick = (upgrade, index) => {
    const timesBought = boughtUpgrades[index] || 0;
    const upgradeCost = calculateUpgradeCost(Number(upgrade.cost), timesBought);
    const upgradeIncrease = Number(upgrade.increase);

    if (cookies >= upgradeCost) {
      setCookies((prevCookies) => Math.round(prevCookies - upgradeCost));

      setCookiesPerSecond((prevCPS) => Math.round(prevCPS + upgradeIncrease));

      const newBoughtUpgrades = [...boughtUpgrades];
      newBoughtUpgrades[index] += 1;
      setBoughtUpgrades(newBoughtUpgrades);

      localStorage.setItem("boughtUpgrades", JSON.stringify(newBoughtUpgrades));
    }
  };

  return (
    <div className="rightSection">
      <h2>Available Upgrades</h2>
      <div className="upgradeWrapper">
        {upgrades.map((upgrade, index) => {
          const timesBought = boughtUpgrades[index] || 0;
          const currentUpgradeCost = calculateUpgradeCost(
            Number(upgrade.cost),
            timesBought
          );

          return (
            <div key={upgrade.id} className="buyUpgrades">
              <p>
                {upgrade.name}: {upgrade.description}
                <br />
                Cost: {currentUpgradeCost} cookies <br />
                Increases CPS by: {upgrade.increase}
                <br />
                Times bought: {timesBought}{" "}
              </p>
              <button
                className="button"
                onClick={() => handleUpgradeClick(upgrade, index)}
              >
                Buy Upgrade
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import "./Toggle.css";

export function Toggle() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setActive(false), 2000);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <label className={`container ${active ? "container--active" : ""}`}>
      <input
        type="checkbox"
        role="switch"
        checked={active}
        onChange={() => setActive((a) => !a)}
        aria-label="toggle active state"
      />
      <div className={`inner ${active ? "inner--active" : ""}`} />
    </label>
  );
}

export default Toggle;

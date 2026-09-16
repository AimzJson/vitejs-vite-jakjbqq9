import { useEffect, useState } from 'react';
import './Toggle.css';

export function Toggle() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setActive(false), 2000);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <button
      className={`container ${active ? 'container--active' : ''}`}
      onClick={() => setActive((a) => !a)}
      role="switch"
      aria-checked={active}
      aria-label="toggle active state"
    >
      <div className={`inner ${active ? 'inner--active' : ''}`} />
    </button>
  );
}

export default Toggle;

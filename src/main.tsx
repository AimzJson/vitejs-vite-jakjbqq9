import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Toggle from './Toggle.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="page">
      <Toggle />
    </div>
  </StrictMode>
);

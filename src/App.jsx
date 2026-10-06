import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

export default function App() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <ProductList onHome={() => setStarted(false)} />;
  }

  return (
    <div className="landing">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Where Green Meets Serenity</p>
        <button className="btn" onClick={() => setStarted(true)}>Get Started</button>
      </div>
      <AboutUs />
    </div>
  );
}

import { BrowserRouter } from 'react-router-dom';

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from './components';
import Bouha2 from './components/Bouha2';
import Bouha1 from './components/Bouha1';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />

        <div className="relative z-0">
          <Bouha2 />

          <StarsCanvas />
        </div>
        <div className="relative z-0">
          <Bouha1 />

          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

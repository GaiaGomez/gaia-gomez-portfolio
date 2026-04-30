import './App.css';
import CustomCursor from './components/CustomCursor';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Projects     from './components/Projects';
import About        from './components/About';
import Contact      from './components/Contact';

export default function App() {
  return (
    <>
      {/* Grain noise overlay */}
      <div id="noise-overlay" />

      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}

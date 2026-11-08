import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Game from './pages/Game';
import MockGame from './pages/MockGame';
import ZabavaArtem from './pages/ZabavaArtem';
import Minesweeper from './pages/KharynaSerhii';
import VasylchenkoAlina from './pages/VasylchenkoAlina/Minesweeper';
import HavrasPavlo from './pages/HavrasPavlo';
import HrabovyiIvan from './pages/HrabovyiIvan';
import BraginaAlona from './pages/BraginaAlona';
import KorzhykAnton from './pages/KorzhykAnton';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="game" element={<Game />} />
        <Route path="mock-game" element={<MockGame />} />
        <Route path="zabava-artem" element={<ZabavaArtem />} />
        <Route path="kharyna-serhii" element={<Minesweeper />} />
        <Route path="vasylchenko-alina" element={<VasylchenkoAlina />} />
        <Route path="havras-pavlo" element={<HavrasPavlo />} />
        <Route path="hrabovyi-ivan" element={<HrabovyiIvan />} />
        <Route path="bragina-alona" element={<BraginaAlona />} />
        <Route path="korzhyk-anton" element={<KorzhykAnton />} />
      </Route>
    </Routes>
  );
}

export default App;

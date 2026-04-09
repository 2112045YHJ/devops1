import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductWrite from "./components/ProductWrite";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <Router>
      <div className="container max-w-4xl p-10 mx-auto">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/insert" element={<ProductWrite />} />
          <Route path="/product/:num" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

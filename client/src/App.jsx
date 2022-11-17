import "./App.css";
import CreatePupForm from "./components/CreatePupForm";
import Puppies from "./components/Puppies";
import SinglePuppy from "./components/SinglePuppy";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Puppies />} />
        <Route path="/createPuppy" element={<CreatePupForm />} />
        <Route path="/:id" element={<SinglePuppy />} />
      </Routes>
    </div>
  );
}

export default App;

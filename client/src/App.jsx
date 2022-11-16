import "./App.css";
import CreatePupForm from "./components/CreatePupForm";
import Puppies from "./components/Puppies";

function App() {
  return (
    <div className="App">
      <Puppies />
      <CreatePupForm />
    </div>
  );
}

export default App;

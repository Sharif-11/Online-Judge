import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./Components/Home";
import Problem from "./Components/Problem";
import Submit from "./Components/Submit";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <Home />
      <ToastContainer />
    </div>
  );
}

export default App;

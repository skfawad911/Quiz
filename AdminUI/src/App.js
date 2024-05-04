import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
function App() {
  return (
    <div className="media-main">
      <div className="media-div1">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
      <div className="media-div2">
        <p className="p-mesg">
          This website is optimized for use on desktop browsers only.
        </p>
      </div>
    </div>
  );
}

export default App;

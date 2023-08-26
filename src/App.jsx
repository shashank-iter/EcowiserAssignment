import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    // code inside this div as root entry of your app
    <div className="App min-h-screen bg-gray-700 text-white p-8 text-center space-y-4">
      <div className="flex justify-evenly">
        <a href="https://vitejs.dev" target="_blank">
          <img
            src="/vite.svg"
            className="logo h-40 
          hover:drop-shadow-[0_35px_35px_rgba(100,108,255,0.667)] "
            alt="Vite logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo h-40 react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div
        className="card group rounded-xl ring-4 ring-gray-800 hover:ring-0 transition-shadow duration-500
      peer
      "
      >
        <button
          className="p-2 rounded-2xl transition duration-500 ring-4 ring-transparent group-hover:ring-yellow-500
          group-hover:bg-yellow-300
          group-hover:text-black
          group-hover:drop-shadow-[0_0_10px_yellow]
          "
          onMouseMove={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs transition-all duration-200 border-gray-800 peer-hover:border-2 rounded-b-md">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

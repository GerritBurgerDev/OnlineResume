import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './App.scss'
import './components/navbar/navbar';
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }
  ])

  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  )
}

export default App

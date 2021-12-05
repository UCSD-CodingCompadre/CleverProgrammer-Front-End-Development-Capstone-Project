/* eslint-disable jsx-a11y/img-redundant-alt */
import './App.css';
import Signup from './pages/Signup';
import Signin from "./pages/Signin"
import Currency from "./components/Currency"
import Dashboard from "./pages/Dashboard"
import Deposit from "./pages/Deposit"
import Withdrawal from "./pages/Withdrawal"
import Exchange from "./pages/Exchange"
import { BrowserRouter, Routes, Route} from "react-router-dom"

// App component 
// Contains the BrowserRouter for the entire web application.
// It establishes all the routes the web application needs and they direct
// to page components, in other words the front-end the user sees.
function App() 
{
  return (
    // Main router that allows the routes to connect and work
    <BrowserRouter>
    {/* Hold the container of the app*/}
    <div className="App">
      {/* Establish all the necessary routes */}
      <Routes>
        <Route path="/" element={<Signin /> } />
        <Route path="/signup" element={<Signup /> } />
        <Route path="/currency" element={<Currency /> } />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/deposit" element={<Deposit /> } />
        <Route path="/withdrawal" element={<Withdrawal /> } />
        <Route path="/transfer" element={<Exchange /> } />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

// Export the component
export default App;

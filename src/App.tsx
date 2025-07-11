import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToolProvider } from './contexts/ToolContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddTool from './pages/AddTool';
import BrowseTools from './pages/BrowseTools';
import ToolDetail from './pages/ToolDetail';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <ToolProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-tool" element={<AddTool />} />
                <Route path="/browse" element={<BrowseTools />} />
                <Route path="/tool/:id" element={<ToolDetail />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ToolProvider>
    </AuthProvider>
  );
}

export default App;
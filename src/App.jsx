import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BuildIcon from '@mui/icons-material/Build';
import PetsIcon from '@mui/icons-material/Pets';
import SettingsIcon from '@mui/icons-material/Settings';
import { FieldsProvider } from "./context/FieldsContext";


import Fields from "./pages/Fields";
import Tasks from "./pages/Tasks";
import Machines from "./pages/Machines";
import Animals from "./pages/Animals";
import Settings from "./pages/Settings";

const navConfig = [
  { label: "Fields", path: "/fields", icon: <ListAltIcon /> },
  { label: "Tasks", path: "/tasks", icon: <AssignmentTurnedInIcon /> },
  { label: "Machines", path: "/machines", icon: <BuildIcon /> },
  { label: "Animals", path: "/animals", icon: <PetsIcon /> },
  { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

function VivanoBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  // Find the index of the current tab based on the current path
  const currentTab = navConfig.findIndex((item) => location.pathname.startsWith(item.path));
  return (
    <Box sx={{ width: 1, position: "fixed", bottom: 0, left: 0, zIndex: 10 }}>
      <BottomNavigation
        value={currentTab === -1 ? 0 : currentTab}
        onChange={(_, newValue) => navigate(navConfig[newValue].path)}
        showLabels
        sx={{ bgcolor: "#388e3c" }}
      >
        {navConfig.map(item =>
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            icon={item.icon}
            sx={{ color: "white" }}
          />
        )}
      </BottomNavigation>
    </Box>
  );
}

function App() {
  return (
    <FieldsProvider>
      <Router>
        <Box sx={{ pb: 7, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <Routes>
            <Route path="/" element={<Fields />} />
            <Route path="/fields" element={<Fields />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/machines" element={<Machines />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <VivanoBottomNav />
        </Box>
      </Router>
    </FieldsProvider>
    
  );
}

export default App;

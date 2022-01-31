import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import { ServerProvider } from "./contexts/ServerContext";
import { theme, darkTheme } from "./components/styles/themes/theme";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
  const [dark, setDark] = useState(true);
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={dark ? darkTheme : theme}>
          <Router>
            <AuthProvider>
              <ServerProvider>
                <Routes>
                  <Route element={<Dashboard />} path="/" exact="true" />
                </Routes>
              </ServerProvider>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;

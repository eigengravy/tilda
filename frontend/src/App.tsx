import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Container,
} from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useColorScheme } from "@mantine/hooks";
import { TildaFooter } from "./components/TildaFooter";
import { TildaHeader } from "./components/TildaHeader";
import Dashboard from "./pages/Dashboard";
import Gist from "./pages/Gist";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import axios from "axios";

axios.defaults.baseURL = `http://localhost:5000/api`

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Dashboard />}></Route>
              <Route path="signin" element={<Auth type={"signin"} />}></Route>
              <Route path="signup" element={<Auth type={"signup"} />}></Route>
              <Route path=":name">
                <Route index element={<Profile />}></Route>
                <Route path=":id" element={<Gist />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;

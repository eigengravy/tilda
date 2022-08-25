import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useColorScheme } from "@mantine/hooks";
import Dashboard from "./pages/Dashboard";
import ViewOrEditGist from "./pages/ViewOrEditGist";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import axios from "axios";
import { NotFound } from "./components/NotFound";
import CreateGist from "./pages/CreateGist";

axios.defaults.baseURL = import.meta.env.VITE_SERVER;

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
                <Route path="create" element={<CreateGist />}></Route>
                <Route path=":id" element={<ViewOrEditGist />}></Route>
              </Route>
              <Route path="notfound" element={<NotFound />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;

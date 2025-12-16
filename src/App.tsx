import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import GameGrid from "./components/game/GameGrid";
import AppBackground from "./components/layout/AppBackground";


function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    // Prevent browser from restoring scroll position
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    // Force scroll to top with a slight delay to ensure layout is ready
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box position="relative" minHeight="100vh">
      <AppBackground />

      {/* Content on top of background */}
      <Box position="relative" zIndex="1">
        <Navbar onSearch={(searchText) => setSearchText(searchText)} />

        <Flex>
          <Sidebar onSelectGenre={setSelectedGenre} />

          <Box flex="1" p={5}>
            <GameGrid searchText={searchText} genre={selectedGenre} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}


export default App;
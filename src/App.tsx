import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import GameGrid from "./components/game/GameGrid";
import AppBackground from "./components/layout/AppBackground";


import GameHeading from "./components/game/GameHeading";


function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <Navbar />

        <GameHeading
          onSearch={(searchText) => setSearchText(searchText)}
          onToggleSidebar={() => setIsSidebarOpen(true)}
          selectedGenre={selectedGenre}
        />

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectGenre={(genre) => {
            setSelectedGenre(genre);
            setIsSidebarOpen(false); // Close sidebar on selection logic optional, usually good UX on mobile. Keeping it open or closed depends on desktop/mobile. 
            // For a Drawer UX, usually close on selection.
          }}
        />

        <Box p={5}>
          <GameGrid searchText={searchText} genre={selectedGenre} />
        </Box>
      </Box>
    </Box>
  );
}


export default App;
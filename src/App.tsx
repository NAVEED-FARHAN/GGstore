import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import GameGrid from "./components/game/GameGrid";
import AppBackground from "./components/layout/AppBackground";
import HomePage from "./components/home/HomePage";
import GameHeading from "./components/game/GameHeading";
import GameDetailsModal from "./components/game/GameDetailsModal";
import { Game } from "./data/games";

const MotionBox = motion(Box);

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Transition Stages
  type TransitionStage =
    | 'landing'
    | 'fading-out-landing'
    | 'morphing-to-main'
    | 'main'
    | 'fading-out-main'
    | 'morphing-to-landing';

  const [transitionStage, setTransitionStage] = useState<TransitionStage>('landing');

  // Handle Enter click (Landing -> Main)
  const handleEnter = () => {
    setTransitionStage('fading-out-landing'); // 0.5s fade out

    setTimeout(() => {
      setTransitionStage('morphing-to-main'); // Background starts morphing to DARK

      // 2.5s morph
      setTimeout(() => {
        setTransitionStage('main'); // Main UI Fade In
      }, 2500);

    }, 500);
  };

  // Handle Back click (Main -> Landing)
  const handleBack = () => {
    setTransitionStage('fading-out-main'); // 0.5s fade out

    setTimeout(() => {
      setTransitionStage('morphing-to-landing'); // Background starts morphing to LIGHT

      // 2.5s morph
      setTimeout(() => {
        setTransitionStage('landing'); // Landing UI Fade In
      }, 2500);

    }, 500);
  };

  // Determine Background Props based on stage
  // We want the background to be "Landing" (Light) when:
  // - We are AT landing
  // - We are LEAVING landing (fading out)
  // - We are MORPHING TO landing (so the target values are Light, and it lerps towards them)
  const isLandingTarget =
    transitionStage === 'landing' ||
    transitionStage === 'fading-out-landing' ||
    transitionStage === 'morphing-to-landing';

  const bgConfig = isLandingTarget ? {
    intensity: 0.8,
    pillarWidth: 3.3,
    rotationSpeed: 0.5,
    rotation: 36,
    topColor: "#ffffff",
    bottomColor: "#ffffff"
  } : {
    intensity: 2,
    pillarWidth: 20.0,
    rotationSpeed: 0.05,
    rotation: 45,
    topColor: "rgba(0, 0, 0, 1)",
    bottomColor: "#000000ff"
  };

  return (
    <Box position="relative" minHeight="100vh">
      {/* Background */}
      <AppBackground
        intensity={bgConfig.intensity}
        pillarWidth={bgConfig.pillarWidth}
        rotationSpeed={bgConfig.rotationSpeed}
        rotation={bgConfig.rotation}
        topColor={bgConfig.topColor}
        bottomColor={bgConfig.bottomColor}
      />

      {/* Landing Page Layer */}
      <AnimatePresence>
        {(transitionStage === 'landing' || transitionStage === 'fading-out-landing') && (
          <HomePage onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Main Content Layer - only mounted when stage is main or fading-out-main to trigger entrance animations */}
      {(transitionStage === 'main' || transitionStage === 'fading-out-main') && (
        <MotionBox
          position="relative"
          zIndex="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: transitionStage === 'main' ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <Navbar onLogoClick={handleBack} />

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
              setIsSidebarOpen(false);
            }}
          />

          <Box p={5}>
            <GameGrid
              searchText={searchText}
              genre={selectedGenre}
              onSelectGame={(game) => setSelectedGame(game)}
            />
          </Box>
        </MotionBox>
      )}

      {/* Game Details Modal */}
      <GameDetailsModal
        game={selectedGame}
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </Box>
  );
}


export default App;
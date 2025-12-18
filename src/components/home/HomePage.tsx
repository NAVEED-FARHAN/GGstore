import { Box, Button, VStack, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import TextType from "../ui/TextType";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface HomePageProps {
    onEnter: () => void;
}

const quotes = [
    "Rise. The world will not wait for the weak, and neither will I.",
    "I have bled across centuries pick up the blade and earn your place beside me.",
    "Kings are not born in peace… they are forged where games become war.",
    "Heaven cast me down, yet I still rule every battlefield I enter.",
    "Press forward every defeat is merely a lesson written in blood.",
    "Your courage is untested. Enter, and let fate judge your worth.",
    "Empires fall, legends remain. Decide which you will be.",
    "I do not promise victory… only glory for those who endure.",
    "The throne is empty. Take it if your hands do not tremble.",
    "Step into the arena. Tonight, you are not a player… you are a conqueror."
];

const HomePage = ({ onEnter }: HomePageProps) => {
    return (
        <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            zIndex={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="transparent"
        >
            <VStack spacing={10} mt="-10vh"> {/* Pushed slightly to top */}

                {/* Using the new TextType component */}
                {/* We wrap it in Chakra Text to maintain font styles if needed, or pass classNames */}
                <Text
                    fontSize={{ base: "x2", md: "2xl" }}
                    fontWeight="light"
                    fontFamily="monospace"
                    color="white"
                    textAlign="center"
                    maxW="900px"
                    minH="5em"
                    px={4}
                    textShadow="0 0 10px rgba(255,255,255,0.5)"
                    as="div"
                >
                    <TextType
                        text={quotes}
                        typingSpeed={40}
                        deletingSpeed={30}
                        pauseDuration={4000}
                        loop={true}
                        showCursor={true}
                    />
                </Text>

                <MotionButton
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 255, 255, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEnter}
                    variant="unstyled"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={3}
                    height="auto"
                    borderRadius="xl"
                    border="1px solid rgba(255,255,255,0.1)"
                    backdropFilter="blur(20px)"
                    bg="rgba(0, 0, 0, 0.3)"
                    _hover={{ bg: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.5)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
                >
                    <Image
                        src="/xyba.png"
                        alt="Enter"
                        h="200px"
                        objectFit="contain"
                        filter="drop-shadow(0 0 10px rgba(255,255,255,0.3))"
                    />
                </MotionButton>
            </VStack>
        </MotionBox>
    );
};

export default HomePage;

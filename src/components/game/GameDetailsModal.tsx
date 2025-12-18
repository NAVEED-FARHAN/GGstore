import { Box, Heading, Text, Button, Flex, IconButton, Image, VStack, HStack, Badge } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Game } from "../../data/games";
import { FaPlay, FaInfoCircle, FaTimes, FaStar } from "react-icons/fa";

const MotionBox = motion(Box);

interface GameDetailsModalProps {
    game: Game | null;
    isOpen: boolean;
    onClose: () => void;
}

const GameDetailsModal = ({ game, isOpen, onClose }: GameDetailsModalProps) => {
    if (!game) return null;

    // Placeholder data if missing from game object
    // In a real app, these would come from the game object or an API fetch
    const videoUrl = "https://cdn.pixabay.com/video/2023/10/12/184734-873923030_large.mp4"; // Generic high-quality sci-fi/abstract BG
    const rating = 4.8;
    const releaseYear = "2024";
    const tags = ["4K HDR", "Single Player", "Action", "Adventure"];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        position="fixed"
                        top="0"
                        left="0"
                        width="100vw"
                        height="100vh"
                        bg="rgba(0, 0, 0, 0.85)" // Dimmed background
                        zIndex={9000}
                        onClick={onClose}
                        backdropFilter="blur(5px)"
                    />

                    {/* Modal Panel */}
                    <MotionBox
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Spring-like feel
                        position="fixed"
                        top="2vh"
                        left="1vw"
                        width="98vw"
                        height="96vh"
                        bg="#1a1a1a"
                        zIndex={9001}
                        borderRadius="3xl"
                        overflow="hidden"
                        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()} // Prevent closing on click inside
                    >
                        {/* Hero Video Background */}
                        <Box position="absolute" top="0" left="0" width="100%" height="70%" overflow="hidden">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                            >
                                <source src={videoUrl} type="video/mp4" />
                            </video>
                            {/* Gradient Overlay for Text Readability */}
                            <Box
                                position="absolute"
                                top="0"
                                left="0"
                                width="100%"
                                height="100%"
                                bgGradient="linear(to-t, #1a1a1a 10%, rgba(26,26,26,0.8) 25%, rgba(0,0,0,0) 60%)"
                            />
                            {/* Close Button */}
                            <IconButton
                                aria-label="Close modal"
                                icon={<FaTimes />}
                                position="absolute"
                                top={6}
                                right={6}
                                variant="ghost"
                                color="white"
                                fontSize="24px"
                                onClick={onClose}
                                _hover={{ bg: "rgba(255,255,255,0.1)", transform: "scale(1.1)" }}
                                borderRadius="full"
                                zIndex={10}
                            />
                        </Box>

                        {/* Content Container */}
                        <Flex
                            direction="column"
                            position="absolute"
                            bottom="0"
                            left="0"
                            width="100%"
                            height="100%"
                            justify="flex-end"
                            p={{ base: 6, md: 10, lg: 16 }}
                            pointerEvents="none" // Let clicks pass through to video/bg area if needed, but we re-enable for buttons
                        >
                            {/* Text Content */}
                            <VStack align="start" spacing={4} maxW="800px" mb={10} pointerEvents="auto">
                                {/* Title (Using Logo or Text) */}
                                <Heading
                                    as="h1"
                                    size="4xl"
                                    color="white"
                                    textShadow="0 4px 10px rgba(0,0,0,0.5)"
                                    fontFamily="'Montserrat', sans-serif" // Assume font exists or default
                                    sx={{ letterSpacing: "-1px" }}
                                >
                                    {game.title}
                                </Heading>

                                {/* Meta Data Row */}
                                <HStack spacing={4} color="gray.300" fontSize="lg" fontWeight="medium">
                                    <Text color="#46d369" fontWeight="bold">{(rating * 20)}% Match</Text>
                                    <Text>{releaseYear}</Text>
                                    <HStack spacing={1}>
                                        <Badge variant="outline" colorScheme="gray">4K</Badge>
                                        <Badge variant="outline" colorScheme="gray">HDR</Badge>
                                    </HStack>
                                </HStack>

                                {/* Description */}
                                <Text
                                    color="gray.200"
                                    fontSize="xl"
                                    textShadow="0 2px 4px rgba(0,0,0,0.8)"
                                    lineHeight="1.6"
                                    maxW="700px"
                                >
                                    {/* Using a rich placeholder description if raw game data is sparse, 
                                        but ideally game.description exists. */}
                                    Experience an epic journey through a beautifully crafted world.
                                    Master unique abilities, uncover hidden secrets, and battle fearsome foes
                                    in this award-winning adventure that redefines the genre.
                                </Text>

                                {/* Tags */}
                                <HStack spacing={3} mt={2}>
                                    {game.genre.map(g => (
                                        <Text key={g} color="white" fontSize="sm">
                                            <Box as="span" color="gray.500" mr={1}>•</Box>
                                            {g}
                                        </Text>
                                    ))}
                                </HStack>

                                {/* Action Buttons */}
                                <HStack spacing={5} mt={6}>
                                    <Button
                                        leftIcon={<FaPlay />}
                                        size="lg"
                                        bg="white"
                                        color="black"
                                        px={8}
                                        h="56px"
                                        fontSize="xl"
                                        fontWeight="bold"
                                        _hover={{ bg: "gray.200", transform: "scale(1.05)" }}
                                        _active={{ transform: "scale(0.95)" }}
                                        transition="all 0.2s"
                                        boxShadow="0 0 20px rgba(255,255,255,0.3)"
                                    >
                                        Play
                                    </Button>
                                    <Button
                                        leftIcon={<FaInfoCircle />}
                                        size="lg"
                                        variant="outline" // Glassy look
                                        color="white"
                                        borderColor="rgba(255,255,255,0.4)"
                                        bg="rgba(109, 109, 110, 0.4)" // Netflix-style translucent gray
                                        backdropFilter="blur(10px)"
                                        px={8}
                                        h="56px"
                                        fontSize="xl"
                                        fontWeight="bold"
                                        _hover={{ bg: "rgba(109, 109, 110, 0.7)", borderColor: "white" }}
                                        _active={{ transform: "scale(0.95)" }}
                                    >
                                        More Info
                                    </Button>
                                </HStack>
                            </VStack>
                        </Flex>
                    </MotionBox>
                </>
            )}
        </AnimatePresence>
    );
};

export default GameDetailsModal;

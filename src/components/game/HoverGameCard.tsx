import { Box, HStack, Image, Text, Badge, Flex, VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HoverGameCardProps {
    title: string;
    releaseDate: string;
    image: string;
    rating: number;
    reviewCount: number;
    genres: string[];
    platforms: string[];
    description?: string;
}

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -2 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    },
    exit: { opacity: 0, scale: 0.95, y: 10 }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const HoverGameCard = ({ title, releaseDate, image, rating, reviewCount, genres, platforms, description }: HoverGameCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Mock Gameplay Images for the carousel effect
    const gameplayImages = [
        image, // Main cover
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80", // Generic Gaming
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80", // Another gaming shot
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80"  // Cyberpunk-ish
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % gameplayImages.length);
        }, 1500); // 1.5s shuffle

        return () => clearInterval(interval);
    }, [gameplayImages.length]);

    return (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            width="340px"
            bg="rgba(10, 10, 10, 0.9)"
            backdropFilter="blur(15px) saturate(150%)"
            border="2px solid rgba(201, 201, 201, 0.81)"
            boxShadow="0 0 20px rgba(255, 255, 255, 0.2), 0 30px 60px rgba(0, 0, 0, 0.8)"
            borderRadius="md"
            overflow="hidden"
            p={3}
            display="flex"
            flexDirection="column"
            gap={4}
            _before={{
                content: '""',
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                bg: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 60%)",
                transform: "rotate(45deg)",
                pointerEvents: "none"
            }}
        >
            {/* Image Frame */}
            <Box
                as={motion.div}
                variants={itemVariants}
                position="relative"
                width="100%"
                paddingBottom="65%"
                borderRadius="sm"
                overflow="hidden"
                boxShadow="inner"
                bg="black"
            >
                <AnimatePresence mode="wait">
                    <MotionImage
                        key={currentImageIndex}
                        src={gameplayImages[currentImageIndex]}
                        alt={title}
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                </AnimatePresence>

                <HStack position="absolute" bottom="2" right="2" spacing={1}>
                    {platforms.map(p => (
                        <Badge key={p} variant="solid" colorScheme="blackAlpha" fontSize="xx-small" backdropFilter="blur(4px)">
                            {p}
                        </Badge>
                    ))}
                </HStack>
            </Box>

            {/* Content Section */}
            <VStack align="start" spacing={2} px={1} as={motion.div} variants={itemVariants}>
                <Flex justify="space-between" width="100%" align="center">
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color="white"
                        letterSpacing="wide"
                        textShadow="0 2px 10px rgba(0,0,0,0.5)"
                        noOfLines={1}
                    >
                        {title}
                    </Text>
                    <HStack spacing={1}>
                        <Text color="yellow.300" fontSize="sm">★</Text>
                        <Text color="white" fontWeight="bold" fontSize="sm">{rating}</Text>
                    </HStack>
                </Flex>

                <Text fontSize="xs" color="gray.400" fontStyle="italic">
                    Released: {releaseDate} • {reviewCount.toLocaleString()} Reviews
                </Text>

                {/* Description */}
                {description && (
                    <Text fontSize="sm" color="gray.300" lineHeight="1.4" noOfLines={4}>
                        {description}
                    </Text>
                )}

                <Flex gap={2} mt={1} wrap="wrap">
                    {genres.slice(0, 3).map((genre) => (
                        <Badge
                            key={genre}
                            px={2}
                            py={0.5}
                            borderRadius="full"
                            variant="outline"
                            colorScheme="cyan"
                            fontSize="9px"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            border="1px solid rgba(0, 255, 255, 0.4)"
                            color="cyan.200"
                        >
                            {genre}
                        </Badge>
                    ))}
                </Flex>
            </VStack>
        </MotionBox>
    );
};

export default HoverGameCard;

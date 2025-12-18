import { Box, Image, Portal } from "@chakra-ui/react";
import GlareHover from "../ui/GlareHover";
import HoverGameCard from "./HoverGameCard";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

interface GameCardProps {
    title: string;
    image: string;
    genres?: string[];
}

function GameCard({ title, image, genres = ["Action", "RPG"] }: GameCardProps) {
    const [showHoverCard, setShowHoverCard] = useState(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const calculatePosition = () => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const cardWidth = 320; // Width of HoverGameCard
        const gap = 16;
        const widthWithGap = cardWidth + gap;

        // Default to right side
        let left = rect.right + gap;

        // If not enough space on right, check left
        if (left + cardWidth > viewportWidth) {
            left = rect.left - widthWithGap;
        }

        // If still off screen (e.g. mobile or very large card), center it using fixed positioning if we wanted,
        // but for "Steam-like" we usually prefer flipping. 
        // Let's ensure it doesn't go off left edge either.
        if (left < 0) {
            // Last resort: center on screen or anchor to whatever space is biggest?
            // For now, let's just stick to the flip logic.
            // If it's too small for both, user is likely on mobile where hover is weird anyway.
        }

        // Vertical Alignment: Align top of card with top of popup, but handle bottom overflow
        let top = rect.top;
        if (top + 400 > window.innerHeight) { // Assuming popup ~400px height
            top = window.innerHeight - 420; // Pin to bottom with margin
        }

        setPosition({ top, left });
    };

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
            calculatePosition();
            setShowHoverCard(true);
        }, 2000); // 2 seconds delay as requested (reduced from 4s)
    };

    const handleMouseLeave = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
        setShowHoverCard(false);
    };

    // Recalculate or hide on scroll
    useEffect(() => {
        if (showHoverCard) {
            const handleScroll = () => setShowHoverCard(false);
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [showHoverCard]);

    // Mock data
    const demoDetails = {
        rating: 4.8,
        reviewCount: 12500,
        releaseDate: "Dec 12, 2024",
        platforms: ["PC", "VR", "PS5"],
        description: "Experience an epic journey through a beautifully crafted world. Master unique abilities, uncover hidden secrets, and battle fearsome foes in this award-winning adventure that redefines the genre."
    };

    return (
        <>
            <Box
                ref={cardRef}
                position="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                transition="all 0.5s"
                _hover={{ transform: "scale(1.05)", zIndex: 1000 }}
                // zIndex on this box only affects this stacking context. 
                // The Portal escapes it for the popup.
                borderRadius="xl"
            >
                <Box overflow="hidden" borderRadius="xl">
                    <GlareHover
                        width="100%"
                        height="100%"
                        background="transparent"
                        borderRadius="inherit"
                        borderColor="transparent"
                        glareOpacity={0.3}
                        glareColor="#ffffff"
                    >
                        <Box bg="gray.500" h="100%" w="100%">
                            <Image src={image} alt={title} height="260px" width="100%" objectFit="cover" />
                        </Box>
                    </GlareHover>
                </Box>
            </Box>

            <Portal>
                <AnimatePresence>
                    {showHoverCard && (
                        <Box
                            position="fixed"
                            top={position.top}
                            left={position.left}
                            zIndex={9999}
                        // We pass specific props to HoverGameCard to override its default absolute positioning
                        >
                            <HoverGameCard
                                title={title}
                                image={image}
                                genres={genres}
                                {...demoDetails}
                            // We need to modify HoverGameCard to accept style overrides or just wrap it.
                            // Since HoverGameCard has position="absolute" top="50%"..., we need to strip that 
                            // OR wrap it in a relative box that nullifies it?
                            // Actually better to update HoverGameCard to be flexible or wrap it here.
                            // If standard HoverGameCard has fixed positioning styles rooted in it, 
                            // we should pass a prop `isStatic` to disable them, or just overwrite via style prop if Chakra allows.
                            // Looking at HoverGameCard code: it uses MotionBox with explicit top/left/transform.
                            // We should fix HoverGameCard to NOT enforce position if we want to control it externally 
                            // OR we just update it now to NOT represent "Centered Absolute" but "Fill Parent" or "Static".
                            />
                        </Box>
                    )}
                </AnimatePresence>
            </Portal>
        </>
    );
}

export default GameCard;

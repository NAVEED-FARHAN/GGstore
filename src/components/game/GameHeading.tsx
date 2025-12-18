import { Flex, Input, IconButton, Text, HStack, Box } from "@chakra-ui/react";
import { BlurFade } from "../ui/BlurFade";
import { useState, useEffect } from "react";

interface Props {
    onToggleSidebar: () => void;
    onSearch: (searchText: string) => void;
    selectedGenre: string;
}

const HamburgerIcon = (props: any) => (
    <svg
        width="24"
        height="23"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const GameHeading = ({ onToggleSidebar, onSearch, selectedGenre }: Props) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Flex
            justify="space-between"
            align="center"
            w="100%"
            px={8}
            py={4}
            position="sticky"
            top={0}
            zIndex={20}
            bg={isScrolled ? "rgba(0, 0, 0, 0.6)" : "transparent"}
            backdropFilter={isScrolled ? "blur(24px)" : "none"}
            transition="all 0.3s ease-in-out"
        >
            {/* Left: Hamburger + Genre Label */}
            <HStack spacing={4} w="300px"> {/* Fixed width to balance center */}
                <BlurFade delay={0.1} inView>
                    <IconButton
                        aria-label="Open Menu"
                        icon={<HamburgerIcon />}
                        variant="ghost"
                        color="rgb(8, 203, 0)"
                        _hover={{ bg: "whiteAlpha.200" }}
                        onClick={onToggleSidebar}
                        fontSize="24px"
                    />
                </BlurFade>

                <BlurFade delay={0.2} inView>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color="white"
                        textTransform="capitalize"
                    >
                        {selectedGenre || "Games"}
                    </Text>
                </BlurFade>
            </HStack>

            {/* Center: Search Bar */}
            <Box flex={1} display="flex" justifyContent="center">
                <BlurFade delay={0.3} inView>
                    <Input
                        placeholder="Search games..."
                        maxW="500px" // Wider search bar
                        w="400px"
                        bg="rgba(255, 255, 255, 0.1)"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        backdropFilter="blur(5px)"
                        color="white"
                        _placeholder={{ color: "whiteAlpha.600" }}
                        _focus={{
                            bg: "rgba(255, 255, 255, 0.15)",
                            borderColor: "rgb(8, 203, 0)",
                            boxShadow: "0 0 0 1px rgb(8, 203, 0)",
                        }}
                        onChange={(event) => onSearch(event.target.value)}
                        borderRadius="full"
                        px={6}
                    />
                </BlurFade>
            </Box>

            {/* Right: Balance spacer or potentially Sort options later */}
            <Box w="300px" />
        </Flex>
    );
};

export default GameHeading;

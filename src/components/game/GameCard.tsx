import { Box, Image } from "@chakra-ui/react";
import GlareHover from "../ui/GlareHover";

interface GameCardProps {
    title: string;
    image: string;
}

function GameCard({ title, image }: GameCardProps) {
    return (
        <Box
            borderRadius="xl"
            overflow="hidden"
            transition="all 0.5s"
            _hover={{ transform: "scale(1.05)" }}
        >
            <GlareHover
                width="100%"
                height="100%" // Let the content define the height if possible, or use 100% of the Box
                background="transparent" // Let the Box or Image handle background
                borderRadius="inherit" // Match Box's border radius
                borderColor="transparent"
                glareOpacity={0.3}
                glareColor="#ffffff"
            >
                <Box bg="gray.500" h="100%" w="100%">
                    <Image src={image} alt={title} height="260px" width="100%" objectFit="cover" />
                </Box>
            </GlareHover>
        </Box>
    );
}

export default GameCard;

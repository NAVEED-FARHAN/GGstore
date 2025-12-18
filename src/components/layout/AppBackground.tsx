import { Box } from "@chakra-ui/react";
import LightPillar from "../ui/LightPillar";

interface AppBackgroundProps {
    intensity?: number;
    rotationSpeed?: number;
    pillarWidth?: number;
    pillarHeight?: number;
    rotation?: number;
    topColor?: string;
    bottomColor?: string;
}

function AppBackground({
    intensity = 10,
    rotationSpeed = 0.05,
    pillarWidth = 20.0,
    pillarHeight = 0.1,
    rotation = 45,
    topColor = "rgba(0, 0, 0, 1)",
    bottomColor = "#000000ff"
}: AppBackgroundProps) {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            zIndex="0"
            pointerEvents="none"
        >
            <LightPillar
                topColor={topColor}
                bottomColor={bottomColor}
                intensity={intensity}
                rotationSpeed={rotationSpeed}
                glowAmount={0.0005}
                pillarWidth={pillarWidth}
                pillarHeight={pillarHeight}
                noiseIntensity={0}
                pillarRotation={rotation}
                interactive={false}
                mixBlendMode="normal"
            />
        </Box>
    );
}

export default AppBackground;

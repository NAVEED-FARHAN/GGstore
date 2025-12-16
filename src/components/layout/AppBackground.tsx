import { Box } from "@chakra-ui/react";
import LightPillar from "../ui/LightPillar";

function AppBackground() {
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
                topColor="rgba(0, 0, 0, 1)"
                bottomColor="#000000ff"
                intensity={2}
                rotationSpeed={0.05}
                glowAmount={0.0005}
                pillarWidth={20.0}
                pillarHeight={0.1}
                noiseIntensity={0}
                pillarRotation={45}
                interactive={false}
                mixBlendMode="normal"
            />
        </Box>
    );
}

export default AppBackground;

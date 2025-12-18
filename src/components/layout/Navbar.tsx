import { Flex, Text, Image } from "@chakra-ui/react";
import Shuffle from '../ui/Shuffle';

interface NavbarProps {
  onLogoClick?: () => void;
}

function Navbar({ onLogoClick }: NavbarProps) {
  return (
    <Flex
      bg="rgba(0, 0, 0, 0.75)"
      backdropFilter="blur(10px)"
      color="rgb(8, 203, 0)"
      p={4}
      align="center"
      justify="start"
      gap={3}
    >
      <Image
        src="/logo.png"
        h="45px"
        objectFit="contain"
        onClick={onLogoClick}
        cursor="pointer"
        _hover={{ opacity: 0.8 }}
        transition="opacity 0.2s"
        zIndex={2} // Ensure logo is clickable above any centered text layer if overlap
      />

      <Text
        fontSize="3xl"
        fontWeight="bold"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        width="100%"
        textAlign="center"
        pointerEvents="none" // Let clicks pass through if needed (though on top bar unlikely)
      >
        <Shuffle
          text="乂𝚈乃卂.gg"
          shuffleDirection="right"
          duration={1.5}
          animationMode="evenodd"
          shuffleTimes={2}
          ease="power3.out"
          stagger={0.3}
          threshold={0.1}
          triggerOnce={false}
          triggerOnHover={true}
          respectReducedMotion={true}
          loop={true}
          loopDelay={4}
        />
      </Text>
    </Flex>
  );
}

export default Navbar;
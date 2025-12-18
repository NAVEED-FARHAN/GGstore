import { Flex, Text, Image } from "@chakra-ui/react";
import Shuffle from '../ui/Shuffle';

function Navbar() {
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
      <Image src="/logo.png" h="45px" objectFit="contain" />

      <Text fontSize="2xl" fontWeight="bold" fontStyle="italic">
        <Shuffle
          text="XYBA.gg"
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
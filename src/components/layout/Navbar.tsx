import { Flex, Input, Text } from "@chakra-ui/react";
import Shuffle from '../ui/Shuffle';
import { BlurFade } from "../ui/BlurFade";

interface Props {
  onSearch: (searchText: string) => void;
}

function Navbar({ onSearch }: Props) {
  return (
    <Flex
      bg="rgba(0, 0, 0, 0.75)"  // 70% black, 30% transparent
      backdropFilter="blur(10px)"  // Optional: adds blur effect
      color="rgb(8, 203, 0)"
      p={4}
      borderBottom="0.1px solid rgba(255, 255, 255, 0.3)"  // Also made border transparent
      align="center"
      justify="space-between"
    >
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



      <BlurFade delay={0.2} inView>
        <Input
          placeholder="Search games..."
          maxW="300px"
          bg="rgba(255, 255, 255, 0.9)"
          color="black"
          onChange={(event) => onSearch(event.target.value)}
        />
      </BlurFade>
    </Flex>
  );
}

export default Navbar;
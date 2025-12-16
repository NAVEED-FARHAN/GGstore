import { Box, Text, VStack } from "@chakra-ui/react";
import { BlurFade } from "../ui/BlurFade";

interface Props {
  onSelectGenre: (genre: string) => void;
}

function Sidebar({ onSelectGenre }: Props) {
  const genres = [
    "All",
    "Action",
    "Adventure",
    "RPG",
    "Shooter",
    "Racing",
    "Sports",
    "Horror",
    "Open World",
  ];

  return (
    <Box
      width="125px"
      bg="rgba(0, 0, 0, 0.5)"  // 50% black, 30% transparent
      backdropFilter="blur(10px)"  // Optional: adds blur effect
      p={4}
      borderRight="0px solid rgba(255, 255, 255, 0.3)"  // Made border transparent too
      minHeight="100vh"
    >
      <Text
        fontSize="xl"
        mb={4}
        fontWeight="bold"
        color="rgb(8, 203, 0)"
      >
        Genres
      </Text>

      <VStack align="start" spacing={3}>
        {genres.map((genre, idx) => (
          <BlurFade key={genre} delay={0.05 * idx} inView>
            <Text
              color="white"
              transition="0.3s"
              _hover={{
                color: "rgba(159, 241, 5, 1)",
                cursor: "pointer",
                transform: "translateX(5px)",
              }}
              onClick={() => onSelectGenre(genre)}
            >
              {genre}
            </Text>
          </BlurFade>
        ))}
      </VStack>
    </Box>
  );
}

export default Sidebar;
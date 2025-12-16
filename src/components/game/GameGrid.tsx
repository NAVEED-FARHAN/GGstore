import { Grid } from "@chakra-ui/react";
import GameCard from "./GameCard";
import { BlurFade } from "../ui/BlurFade";
import { games } from "../../data/games";

interface Props {
  searchText: string;
  genre: string;
}

function GameGrid({ searchText, genre }: Props) {
  const filtered = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesGenre =
      genre === "" || genre === "All" || game.genre.includes(genre);

    return matchesSearch && matchesGenre;
  });

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(160px, 1fr))" gap={5}>
      {filtered.map((game, idx) => (
        <BlurFade
          key={`${game.id}-${searchText}-${genre}`} // Force re-mount on search/filter change
          delay={0.05 * ((idx * 7) % 4)} // Fast pseudo-random (max 0.15s delay)
          inView
        >
          <GameCard title={game.title} image={game.image} />
        </BlurFade>
      ))}
    </Grid>
  );
}

export default GameGrid;

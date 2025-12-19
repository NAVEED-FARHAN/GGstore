package com.example.gamelibrary.service;

import com.example.gamelibrary.dto.GameRequestDTO;
import com.example.gamelibrary.dto.GameResponseDTO;
import com.example.gamelibrary.entity.Game;
import com.example.gamelibrary.repository.GameRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public GameResponseDTO addGame(GameRequestDTO dto) {
        Game game = new Game(
                dto.getTitle(),
                dto.getDescription(),
                dto.getReleaseDate(),
                dto.getRating(),
                dto.getGenres(),
                dto.getPlatforms(),
                dto.getCoverImageUrl(),
                dto.getBannerImageUrl(),
                dto.getTrailerUrl(),
                dto.getScreenshots()
        );

        Game savedGame = gameRepository.save(game);
        return mapToResponseDTO(savedGame);
    }

    public List<GameResponseDTO> getAllGames() {
        return gameRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public GameResponseDTO getGameById(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));
        return mapToResponseDTO(game);
    }

    public List<GameResponseDTO> searchGames(String query) {
        return gameRepository.findByTitleContainingIgnoreCase(query).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private GameResponseDTO mapToResponseDTO(Game game) {
        GameResponseDTO dto = new GameResponseDTO();
        dto.setId(game.getId());
        dto.setTitle(game.getTitle());
        dto.setDescription(game.getDescription());
        dto.setReleaseDate(game.getReleaseDate());
        dto.setRating(game.getRating());
        dto.setGenres(game.getGenres());
        dto.setPlatforms(game.getPlatforms());
        dto.setCoverImageUrl(game.getCoverImageUrl());
        dto.setBannerImageUrl(game.getBannerImageUrl());
        dto.setTrailerUrl(game.getTrailerUrl());
        dto.setScreenshots(game.getScreenshots());
        return dto;
    }
}

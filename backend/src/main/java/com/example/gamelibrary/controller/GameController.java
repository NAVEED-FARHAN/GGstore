package com.example.gamelibrary.controller;

import com.example.gamelibrary.dto.GameRequestDTO;
import com.example.gamelibrary.dto.GameResponseDTO;
import com.example.gamelibrary.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*") // Allow frontend to communicate
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping
    public ResponseEntity<GameResponseDTO> addGame(@RequestBody GameRequestDTO dto) {
        return new ResponseEntity<>(gameService.addGame(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GameResponseDTO>> getAllGames() {
        return ResponseEntity.ok(gameService.getAllGames());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameResponseDTO> getGameById(@PathVariable Long id) {
        return ResponseEntity.ok(gameService.getGameById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<GameResponseDTO>> searchGames(@RequestParam("q") String query) {
        return ResponseEntity.ok(gameService.searchGames(query));
    }
}

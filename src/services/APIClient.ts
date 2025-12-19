import { Game } from "../types";

const BASE_URL = "http://localhost:8080/api/games";

class APIClient {
    async getAllGames(): Promise<Game[]> {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch games");
        return response.json();
    }

    async getGameById(id: number): Promise<Game> {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch game details");
        return response.json();
    }

    async searchGames(query: string): Promise<Game[]> {
        const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Search failed");
        return response.json();
    }

    async addGame(game: Omit<Game, 'id'>): Promise<Game> {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(game),
        });
        if (!response.ok) throw new Error("Failed to add game");
        return response.json();
    }

    async updateGame(game: Game): Promise<Game> {
        const response = await fetch(`${BASE_URL}/${game.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(game),
        });
        if (!response.ok) throw new Error("Failed to update game");
        return response.json();
    }

    async deleteGame(id: number): Promise<void> {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete game");
    }
}

export default new APIClient();

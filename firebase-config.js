// Server Configuration for Shared Character
// This file manages the communication with the server for shared daily characters
// No authentication required - just anonymous statistics

// Simple API class to handle server communications
class GameServer {
    constructor() {
        // Set this to your API endpoint when deploying
        this.apiEndpoint = null; // e.g., "https://invincibdle-api.example.com"
    }

    // Check if server is configured
    isConfigured() {
        return this.apiEndpoint !== null;
    }

    // Get a unique anonymous ID for this device
    getDeviceId() {
        let deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
            deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
    }

    // Load user stats from server (or localStorage if server not available)
    async loadStats() {
        if (!this.isConfigured()) {
            return this.loadLocalStats();
        }

        try {
            const deviceId = this.getDeviceId();
            const response = await fetch(`${this.apiEndpoint}/stats/${deviceId}`);
            
            if (response.ok) {
                return await response.json();
            } else {
                console.warn("Couldn't load stats from server, falling back to local storage");
                return this.loadLocalStats();
            }
        } catch (error) {
            console.error("Error loading stats from server:", error);
            return this.loadLocalStats();
        }
    }

    // Save user stats to server (and localStorage as backup)
    async saveStats(stats) {
        // Always save to localStorage as backup
        this.saveLocalStats(stats);
        
        if (!this.isConfigured()) {
            return;
        }

        try {
            const deviceId = this.getDeviceId();
            await fetch(`${this.apiEndpoint}/stats/${deviceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stats)
            });
        } catch (error) {
            console.error("Error saving stats to server:", error);
        }
    }

    // Save today's game state to server
    async saveGame(date, guesses, isWon) {
        // Always save to localStorage as backup
        this.saveLocalGame(date, guesses, isWon);
        
        if (!this.isConfigured()) {
            return;
        }

        try {
            const deviceId = this.getDeviceId();
            await fetch(`${this.apiEndpoint}/games/${deviceId}/${date}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    guesses: guesses,
                    won: isWon
                })
            });
        } catch (error) {
            console.error("Error saving game to server:", error);
        }
    }

    // Load today's game state from server
    async loadGame(date) {
        if (!this.isConfigured()) {
            return this.loadLocalGame(date);
        }

        try {
            const deviceId = this.getDeviceId();
            const response = await fetch(`${this.apiEndpoint}/games/${deviceId}/${date}`);
            
            if (response.ok) {
                return await response.json();
            } else {
                return this.loadLocalGame(date);
            }
        } catch (error) {
            console.error("Error loading game from server:", error);
            return this.loadLocalGame(date);
        }
    }

    // Local storage functions as fallback

    loadLocalStats() {
        const savedStats = localStorage.getItem('gameStats');
        return savedStats ? JSON.parse(savedStats) : {
            played: 0,
            won: 0,
            currentStreak: 0,
            maxStreak: 0
        };
    }

    saveLocalStats(stats) {
        localStorage.setItem('gameStats', JSON.stringify(stats));
    }

    loadLocalGame(date) {
        const lastPlayed = localStorage.getItem('lastPlayed');
        if (lastPlayed === date) {
            const savedGuesses = localStorage.getItem('dailyGuesses');
            if (savedGuesses) {
                const guesses = JSON.parse(savedGuesses);
                return { 
                    guesses: guesses,
                    won: false // This will be determined by comparing the last guess
                };
            }
        }
        return null;
    }

    saveLocalGame(date, guesses, isWon) {
        localStorage.setItem('lastPlayed', date);
        localStorage.setItem('dailyGuesses', JSON.stringify(guesses));
    }
}

// Export server instance
const gameServer = new GameServer(); 
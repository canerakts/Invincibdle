# Invincibdle

![Invincible Logo](https://i.imgur.com/4mHUUHz.jpg)

Invincibdle is a Wordle-inspired daily guessing game featuring characters from the hit comic book and TV series Invincible. Test your knowledge of the Invincible universe by trying to guess the daily character in as few attempts as possible!

## Features

- **Same Daily Character**: Everyone gets the same character to guess each day
- **Personal Statistics**: Each player maintains their own guesses and statistics
- **No Sign-in Required**: Play immediately with persistent local storage
- **Daily Reset**: New character at midnight UTC
- **Blood Splatter Effects**: For incorrect guesses (a brutal Invincible touch!)

## How to Play

1. You have 6 attempts to guess the daily Invincible character
2. Type the name of an Invincible character and press Enter or click the Guess button
3. After each guess, you'll see which attributes match the daily character:
   - Matching attributes are highlighted in green
   - Different attributes are highlighted in red
4. Use this feedback to narrow down your next guess
5. Try to guess the character in as few attempts as possible!

## Local Deployment

To run the game locally:

1. Clone this repository
2. Simply open `index.html` in your web browser
3. Start guessing!

## Online Deployment Options

### Basic Deployment (Client-Side Only)

1. Upload all files to any static web hosting service like GitHub Pages, Netlify, or Vercel
2. No additional configuration needed
3. Each player will use their browser's local storage for game state

### Full Deployment with Server (Optional)

For additional features like global leaderboards, you can set up a simple backend:

1. Set up a server with API endpoints for:
   - `/stats/{deviceId}` - GET/POST for player statistics
   - `/games/{deviceId}/{date}` - GET/POST for game state
2. Update `firebase-config.js` by setting `apiEndpoint` to your server URL:

```javascript
this.apiEndpoint = "https://your-server-url.com/api"; 
```

#### Simple Backend Options:

- **Serverless Functions**: AWS Lambda, Vercel Functions, Netlify Functions
- **Simple Express Server**: Node.js with Express and MongoDB
- **Firebase**: Use Firestore database with Firebase Functions

## Technical Details

### How Characters Are Selected

The daily character is selected using a deterministic algorithm based on the UTC date:

```javascript
function setDailyCharacter() {
    const today = new Date();
    
    // Create a fixed seed based on UTC date
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth(); 
    const day = today.getUTCDate();
    
    // Create a deterministic seed value
    const seed = (year * 10000) + ((month + 1) * 100) + day;
    
    // Select character using the seed
    const index = seed % charactersDB.length;
    dailyCharacter = charactersDB[index];
}
```

This ensures all players see the same character on a given day regardless of their timezone.

### How User Data Is Stored

By default, the game uses the browser's localStorage to save:
- Game progress
- Statistics
- A unique device ID

If you set up a server API, this data can be stored remotely while maintaining the same functionality.

## License

This project is created for educational and entertainment purposes only. All character information and related content belong to their respective owners. 
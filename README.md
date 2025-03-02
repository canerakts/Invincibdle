# Invincibdle

![Invincible Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Invincible_comic_series_logo.png/1200px-Invincible_comic_series_logo.pngg)

Invincibdle is a Wordle-inspired daily guessing game featuring characters from the hit comic book and TV series Invincible. Test your knowledge of the Invincible universe by trying to guess the daily character in as few attempts as possible!

## Features

- **Same Daily Character**: Everyone gets the same character to guess each day
- **Personal Statistics**: Each player maintains their own guesses and statistics
- **No Sign-in Required**: Play immediately with persistent local storage
- **Daily Reset**: New character at midnight UTC
- **Background Changes**: Background image changes with wrong guesses

## How to Play

1. You have 6 attempts to guess the daily Invincible character
2. Type the name of an Invincible character and press Enter or click the Guess button
3. After each guess, you'll see which attributes match the daily character:
   - Matching attributes are highlighted in green
   - Partially matching attributes are highlighted in orange
   - Different attributes are highlighted in red
4. Use this feedback to narrow down your next guess
5. Try to guess the character in as few attempts as possible!

## Local Deployment

To run the game locally:

1. Clone this repository
2. Simply open `index.html` in your web browser
3. Start guessing!

### How User Data Is Stored

By default, the game uses the browser's localStorage to save:
- Game progress
- Statistics
- A unique device ID

If you set up a server API, this data can be stored remotely while maintaining the same functionality.

## License

This project is created for educational and entertainment purposes only. All character information and related content belong to their respective owners. 
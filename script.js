document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const characterGuessInput = document.getElementById('character-guess');
    const guessButton = document.getElementById('guess-button');
    const guessesList = document.getElementById('guesses-list');
    const resultMessage = document.getElementById('result-message');
    const winModal = document.getElementById('win-modal');
    const closeButton = document.querySelector('.close-button');
    const correctCharacterSpan = document.getElementById('correct-character');
    const timeRemainingSpan = document.getElementById('time-remaining');
    const nextCharacterTimeSpan = document.getElementById('next-character-time');
    const shareButton = document.getElementById('share-button');
    const attemptsSection = document.getElementById('attempts-section');
    const previousCharacterSpan = document.getElementById('previous-character');
    const previousCharacterContainer = document.getElementById('previous-character-container');
    
    // Background images array - changes with wrong guesses
    const backgroundImages = [
        './images/background/default.jpg', // Default
        './images/background/wrong1.jpg', // Wrong guess 1
        './images/background/wrong2.jpg', // Wrong guess 2
        './images/background/wrong3.jpg', // Wrong guess 3
        './images/background/wrong4.jpg', // Wrong guess 4
        './images/background/wrong5.jpg', // Wrong guess 5
        './images/background/wrong6.jpg'  // Wrong guess 6
    ];
    
    let wrongGuessCount = 0; // Track wrong guesses for background changes
    
    // Game State
    let dailyCharacter;
    let previousDayCharacter = null;
    let gameOver = false;
    let guesses = [];
    let guessCount = 0;
    
    // Statistics
    let stats = { played: 0, won: 0, currentStreak: 0, maxStreak: 0 };
    
    // Initialize the game
    initGame();
    
    // Event Listeners
    guessButton.addEventListener('click', handleGuess);
    characterGuessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGuess();
        }
    });
    
    closeButton.addEventListener('click', () => {
        winModal.classList.add('hidden');
    });
    
    shareButton.addEventListener('click', shareResults);
    
    // Game Functions
    async function initGame() {
        console.log("Initializing game");
        
        try {
            // Try to load previous day's character first
            previousDayCharacter = await loadPreviousDayCharacter();
            if (previousDayCharacter) {
                console.log("Loaded previous character:", previousDayCharacter.name);
                
                // Display the previous day character
                previousCharacterSpan.textContent = previousDayCharacter.name;
                previousCharacterContainer.classList.remove('hidden');
                console.log("Previous character display initialized");
            } else {
                console.log("No previous day character available");
                previousCharacterContainer.classList.add('hidden');
            }
            
            // Set the daily character based on the date
            setDailyCharacter();
            console.log("Initial daily character set:", dailyCharacter.name);
            
            // Ensure the daily character is different from the previous character
            if (previousDayCharacter && dailyCharacter.name === previousDayCharacter.name && charactersDB.length > 1) {
                console.log("Daily character matches previous character on init - selecting a different one");
                // Use next character in array
                const currentIndex = charactersDB.findIndex(char => char.name === dailyCharacter.name);
                const newIndex = (currentIndex + 1) % charactersDB.length;
                dailyCharacter = charactersDB[newIndex];
                console.log("New daily character selected:", dailyCharacter.name);
            }
            
            // Reset background image to default
            setBackgroundImage(0);
            
            // Check if using server
            const useServer = gameServer.isConfigured();
            
            // Load stats and game state
            try {
                // Load player stats
                stats = await gameServer.loadStats();
                
                // Check if the player has played today
                const today = getTodayDateString();
                const todayGame = await gameServer.loadGame(today);
                
                if (todayGame && todayGame.guesses && todayGame.guesses.length > 0) {
                    // Restore today's game
                    console.log("Restoring today's game with", todayGame.guesses.length, "guesses");
                    guesses = todayGame.guesses;
                    guessCount = guesses.length;
                    
                    // Add all previous guesses to the UI
                    attemptsSection.classList.remove('hidden');
                    guessesList.innerHTML = '';
                    guesses.forEach(addGuessToUI);
                    
                    // Check if the last guess was correct
                    const lastGuess = guesses[guesses.length - 1];
                    if (lastGuess.name.toLowerCase() === dailyCharacter.name.toLowerCase()) {
                        gameOver = true;
                        await handleWin();
                    } else if (guessCount >= 6) {
                        gameOver = true;
                        await handleLoss();
                    }
                }
                
                // Update stats display
                updateStatsDisplay();
                
                // Start countdown
                startCountdown();
                
                // Set up autocomplete
                setupCustomDropdown();
                
            } catch (error) {
                console.error("Error loading game state:", error);
                // Continue without saved state
                startCountdown();
                setupCustomDropdown();
            }
        } catch (error) {
            console.error("Error during game initialization:", error);
            // Try to continue with minimal functionality
            setDailyCharacter();
            startCountdown();
            setupCustomDropdown();
        }
    }
    
    // Store previous day character when character changes
    async function savePreviousDayCharacter(character) {
        try {
            if (!character) {
                console.error("Cannot save undefined or null character");
                return;
            }
            
            const previousDayData = {
                character: character,
                savedDate: getTodayDateString()
            };
            
            // Use more specific localStorage key to avoid conflicts
            localStorage.setItem('invincibdle_previousDayCharacter', JSON.stringify(previousDayData));
            console.log("Successfully saved previous day character:", character.name);
        } catch (error) {
            console.error("Error saving previous day character:", error);
        }
    }
    
    // Load previous day character
    async function loadPreviousDayCharacter() {
        try {
            const savedData = localStorage.getItem('invincibdle_previousDayCharacter');
            if (!savedData) {
                return null;
            }

            const data = JSON.parse(savedData);
            const today = getTodayDateString();
            
            // Get yesterday's date
            const yesterday = new Date();
            yesterday.setUTCDate(yesterday.getUTCDate() - 1);
            const yesterdayString = `${yesterday.getUTCFullYear()}-${yesterday.getUTCMonth() + 1}-${yesterday.getUTCDate()}`;
            
            // Only show the previous character if it was from yesterday
            if (data.savedDate === yesterdayString) {
                return data.character;
            }
            
            // If the saved character is not from yesterday, clear it
            if (data.savedDate !== today) {
                localStorage.removeItem('invincibdle_previousDayCharacter');
            }
            
            return null;
        } catch (error) {
            console.error("Error loading previous day character:", error);
            return null;
        }
    }
    
    function setDailyCharacter() {
        // Save the old character value for comparison
        const previousCharacter = dailyCharacter;
        
        // Get the current date components for a daily seed
        const now = new Date();
        
        // Get the date components (year, month, day only)
        const year = now.getUTCFullYear();
        const month = now.getUTCMonth(); // 0-11
        const day = now.getUTCDate(); // 1-31
        
        // Create a seed that changes daily (based only on the date)
        const seed = (year * 10000) + ((month + 1) * 100) + day;
        
        // Select character using the seed (modulo operation ensures we stay in bounds)
        let index = seed % charactersDB.length;
        let newCharacter = charactersDB[index];
        
        // Avoid the same character appearing twice in a row
        if (previousCharacter && newCharacter.name === previousCharacter.name && charactersDB.length > 1) {
            // Simply use the next character in the array if we get the same one
            index = (index + 1) % charactersDB.length;
            newCharacter = charactersDB[index];
            console.log("Avoided duplicate character, using next character instead");
        }
        
        dailyCharacter = newCharacter;
        
        // Reset background when character changes
        wrongGuessCount = 0;
        setBackgroundImage(0);
        
        console.log("Daily character set:", dailyCharacter.name);
    }
    
    // Function to change background image
    function setBackgroundImage(index) {
        if (index >= 0 && index < backgroundImages.length) {
            document.body.style.backgroundImage = `url('${backgroundImages[index]}')`;
            console.log(`Changed background image to: ${backgroundImages[index]}`);
        }
    }
    
    async function handleGuess() {
        if (gameOver) return;
        
        const guessValue = characterGuessInput.value.trim();
        if (!guessValue) return;
        
        // Find the character in the database
        const guessedCharacter = charactersDB.find(
            character => character.name.toLowerCase() === guessValue.toLowerCase()
        );
        
        if (!guessedCharacter) {
            showErrorMessage("Character not found! Try another name.");
            return;
        }
        
        // Check if this character was already guessed
        const alreadyGuessed = guesses.some(
            guess => guess.name.toLowerCase() === guessValue.toLowerCase()
        );
        
        if (alreadyGuessed) {
            showErrorMessage("You already guessed this character!");
            return;
        }
        
        // Clear the input and any error messages
        characterGuessInput.value = '';
        resultMessage.textContent = '';
        resultMessage.className = '';
        
        // Show the guesses section if this is the first guess
        if (guesses.length === 0) {
            attemptsSection.classList.remove('hidden');
        }
        
        // Process the guess
        guessCount++;
        const guessResult = compareCharacters(guessedCharacter, dailyCharacter);
        guesses.push(guessResult);
        
        // Save the game state
        const isCorrect = guessedCharacter.name.toLowerCase() === dailyCharacter.name.toLowerCase();
        await gameServer.saveGame(getTodayDateString(), guesses, isCorrect);
        
        // Add the guess to the UI
        addGuessToUI(guessResult);
        
        // Change background if incorrect
        if (!isCorrect) {
            wrongGuessCount++;
            setBackgroundImage(Math.min(wrongGuessCount, backgroundImages.length - 1));
        }
        
        // Check if the guess is correct
        if (isCorrect) {
            gameOver = true;
            await handleWin();
        }
    }
    
    function compareCharacters(guessedChar, dailyChar) {
        const result = { ...guessedChar, attributes: {} };
        
        // Compare attributes and mark as match, partial match, or different
        // Update to use the new set of attributes
        result.attributes.gender = compareAttribute(guessedChar.gender, dailyChar.gender);
        result.attributes.species = compareAttribute(guessedChar.species, dailyChar.species);
        result.attributes.homePlanet = compareAttribute(guessedChar.homePlanet, dailyChar.homePlanet);
        result.attributes.alignment = compareAttribute(guessedChar.alignment, dailyChar.alignment);
        result.attributes.affiliation = compareAttribute(guessedChar.affiliation, dailyChar.affiliation);
        
        return result;
    }
    
    // Helper function to compare attributes and detect partial matches
    function compareAttribute(guessedAttr, dailyAttr) {
        // Handle case when both attributes are simple strings
        if (typeof guessedAttr === 'string' && typeof dailyAttr === 'string') {
            return {
                value: guessedAttr,
                match: guessedAttr === dailyAttr,
                partial: false
            };
        }
        
        // Convert attributes to arrays for comparison
        const guessedValues = Array.isArray(guessedAttr) ? guessedAttr : [guessedAttr];
        const dailyValues = Array.isArray(dailyAttr) ? dailyAttr : [dailyAttr];
        
        // Check for exact match (all values match in both directions)
        if (arraysEqual(guessedValues, dailyValues)) {
            return {
                value: guessedValues,
                match: true,
                partial: false
            };
        }
        
        // Check for partial match (at least one value in common)
        const hasCommonValue = guessedValues.some(value => 
            dailyValues.includes(value)
        );
        
        return {
            value: guessedValues,
            match: false,
            partial: hasCommonValue
        };
    }
    
    // Helper function to check if two arrays contain the same values
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        
        // Check if every item in arr1 is in arr2 and vice versa
        return arr1.every(val => arr2.includes(val)) && 
               arr2.every(val => arr1.includes(val));
    }
    
    function addGuessToUI(guessResult) {
        const guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        
        // Create a flex container for avatar and attributes
        const guessContent = document.createElement('div');
        guessContent.className = 'guess-content';
        
        // Character avatar
        const avatarElement = document.createElement('img');
        avatarElement.className = 'character-avatar';
        avatarElement.src = guessResult.image;
        avatarElement.alt = guessResult.name;
        
        // Create attributes table
        const attributesTable = document.createElement('div');
        attributesTable.className = 'attributes-table';
        
        // Create attribute titles container
        const attributeTitles = document.createElement('div');
        attributeTitles.className = 'attribute-titles';
        
        // Create attribute values container
        const attributeValues = document.createElement('div');
        attributeValues.className = 'attribute-values';
        
        // Add Name attribute first
        const nameTitle = document.createElement('div');
        nameTitle.className = 'attribute-title';
        nameTitle.textContent = 'Name';
        attributeTitles.appendChild(nameTitle);
        
        const nameValue = document.createElement('div');
        // Check if the name matches the daily character
        const nameMatches = guessResult.name.toLowerCase() === dailyCharacter.name.toLowerCase();
        nameValue.className = `attribute-value ${nameMatches ? 'attribute-match' : 'attribute-different'}`;
        nameValue.textContent = guessResult.name;
        attributeValues.appendChild(nameValue);
        
        // Add other attributes titles and values
        for (const [key, attr] of Object.entries(guessResult.attributes)) {
            const attributeTitle = document.createElement('div');
            attributeTitle.className = 'attribute-title';
            attributeTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            attributeTitles.appendChild(attributeTitle);
            
            const attributeValue = document.createElement('div');
            // Determine the class based on match, partial, or different
            let cssClass = 'attribute-different';
            if (attr.match) {
                cssClass = 'attribute-match';
            } else if (attr.partial) {
                cssClass = 'attribute-partial';
            }
            attributeValue.className = `attribute-value ${cssClass}`;
            
            // Format display value (handle arrays)
            let displayValue = attr.value;
            
            // Format arrays for display
            if (Array.isArray(displayValue)) {
                displayValue = displayValue.length > 0 ? displayValue.join(', ') : 'None';
            } else if (displayValue === '') {
                displayValue = 'None';
            }
            
            attributeValue.textContent = displayValue;
            attributeValues.appendChild(attributeValue);
        }
        
        // Assemble the attributes table
        attributesTable.appendChild(attributeTitles);
        attributesTable.appendChild(attributeValues);
        
        // Add avatar and attributes to the content container
        guessContent.appendChild(avatarElement);
        guessContent.appendChild(attributesTable);
        
        // Assemble the guess item
        guessItem.appendChild(guessContent);
        
        // Add to the guesses list
        guessesList.prepend(guessItem);
    }
    
    async function handleWin() {
        // Check if we've already recorded this win to prevent duplicate stats
        const today = getTodayDateString();
        const todayGame = await gameServer.loadGame(today);
        
        // Only update stats if this is a new win
        if (!todayGame || !todayGame.won) {
            // Update stats
            stats.played++;
            stats.won++;
            stats.currentStreak++;
            stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
            
            // Save stats
            await gameServer.saveStats(stats);
        }
        
        // Show win message and update stats display
        showWinMessage();
        updateStatsDisplay();
    }
    
    async function handleLoss() {
        // Update stats
        stats.played++;
        stats.currentStreak = 0;
        
        // Save stats
        await gameServer.saveStats(stats);
        
        // Show loss message and update stats display
        resultMessage.textContent = `Game over! The character was ${dailyCharacter.name}.`;
        resultMessage.className = 'error-message';
        document.getElementById('statistics').classList.remove('hidden');
        updateStatsDisplay();
    }
    
    function showWinMessage() {
        resultMessage.textContent = `Congratulations! You guessed correctly in ${guessCount} ${guessCount === 1 ? 'try' : 'tries'}!`;
        resultMessage.className = 'win-message';
        
        // Show the win modal
        correctCharacterSpan.textContent = dailyCharacter.name;
        
        // Update the stats in the modal
        const modalStats = document.getElementById('modal-stats');
        modalStats.innerHTML = `
            <p>You guessed in ${guessCount} tries</p>
            <p>Win rate: ${Math.round((stats.won / stats.played) * 100)}%</p>
            <p>Current streak: ${stats.currentStreak}</p>
        `;
        
        winModal.classList.remove('hidden');
        
        // Update stats display
        updateStatsDisplay();
    }
    
    function showErrorMessage(message) {
        resultMessage.textContent = message;
        resultMessage.className = 'error-message';
        
        // Clear the error after 3 seconds
        setTimeout(() => {
            resultMessage.textContent = '';
            resultMessage.className = '';
        }, 3000);
    }
    
    function shareResults() {
        const guessPattern = guesses.map(guess => {
            // For each guess, count the number of matching attributes
            const exactMatches = Object.values(guess.attributes)
                .filter(attr => attr.match).length;
            
            // Count partial matches
            const partialMatches = Object.values(guess.attributes)
                .filter(attr => !attr.match && attr.partial).length;
            
            // If it's the correct character, use the trophy emoji
            if (guess.name.toLowerCase() === dailyCharacter.name.toLowerCase()) {
                return '🏆';
            }
            
            // Otherwise, show a pattern of exact (🟩), partial (🟧), and no matches (🟥)
            const totalAttributes = Object.keys(guess.attributes).length;
            const noMatches = totalAttributes - exactMatches - partialMatches;
            
            return `${exactMatches}🟩 ${partialMatches}🟧 ${noMatches}🟥`;
        });
        
        // Create the share text
        const shareText = `Invincibdle ${getTodayDateString()}\n` +
            `I guessed the character in ${guessCount} tries!\n\n` +
            guessPattern.map((pattern, i) => `${i + 1}. ${pattern}`).join('\n') +
            '\n\nPlay at invincibdle.com';
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareText)
            .then(() => {
                shareButton.textContent = 'COPIED!';
                setTimeout(() => {
                    shareButton.textContent = 'SHARE RESULTS';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy results: ', err);
                // Fallback
                const textArea = document.createElement('textarea');
                textArea.value = shareText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                shareButton.textContent = 'COPIED!';
                setTimeout(() => {
                    shareButton.textContent = 'SHARE RESULTS';
                }, 2000);
            });
    }
    
    function startCountdown() {
        // Calculate time until next day (midnight UTC)
        function updateCountdown() {
            const now = new Date();
            const tomorrow = new Date();
            tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
            tomorrow.setUTCHours(0, 0, 0, 0);
            
            const timeRemaining = tomorrow - now;
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            // Update the countdown display
            const nextCharacterTimeSpan = document.getElementById('next-character-time');
            const timeRemainingSpan = document.getElementById('time-remaining');
            const timeString = `${hours}h ${minutes}m ${seconds}s`;
            
            if (nextCharacterTimeSpan) nextCharacterTimeSpan.textContent = timeString;
            if (timeRemainingSpan) timeRemainingSpan.textContent = timeString;
            
            // Check if we need to change the character
            if (timeRemaining <= 0) {
                // Save the current character as previous day's character before changing
                if (dailyCharacter) {
                    savePreviousDayCharacter(dailyCharacter);
                }
                
                // Reset the game state
                gameOver = false;
                guesses = [];
                guessCount = 0;
                wrongGuessCount = 0;
                
                // Set new daily character
                setDailyCharacter();
                
                // Reset UI
                guessesList.innerHTML = '';
                resultMessage.textContent = '';
                resultMessage.className = '';
                attemptsSection.classList.add('hidden');
                setBackgroundImage(0);
                
                // If not in the middle of a game, reload to start fresh
                if (!gameOver && guesses.length === 0) {
                    console.log("No active game - reloading page");
                    location.reload();
                }
            }
        }
        
        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Helper Functions
    function getTodayDateString() {
        const now = new Date();
        
        // Only include the date (year, month, day) for a daily game
        return `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;
    }
    
    function updateStatsDisplay() {
        // Update the stats display in the UI
        document.getElementById('games-played').textContent = stats.played;
        document.getElementById('games-won').textContent = stats.won;
        document.getElementById('current-streak').textContent = stats.currentStreak;
        document.getElementById('max-streak').textContent = stats.maxStreak;
        
        // Show the statistics section
        document.getElementById('statistics').classList.remove('hidden');
    }
    
    // Create custom dropdown for character selection
    setupCustomDropdown();
    
    function setupCustomDropdown() {
        // Create custom dropdown container
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'custom-dropdown hidden';
        document.body.appendChild(dropdownContainer);
        
        // Position the dropdown below the input field
        function positionDropdown() {
            const inputRect = characterGuessInput.getBoundingClientRect();
            dropdownContainer.style.width = `${inputRect.width + 90}px`; // Add width for button
            dropdownContainer.style.left = `${inputRect.left}px`;
            dropdownContainer.style.top = `${inputRect.bottom}px`;
        }
        
        // Show dropdown when input is focused
        characterGuessInput.addEventListener('focus', () => {
            positionDropdown();
            updateDropdown();
            dropdownContainer.classList.remove('hidden');
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target !== characterGuessInput && !dropdownContainer.contains(e.target)) {
                dropdownContainer.classList.add('hidden');
            }
        });
        
        // Update dropdown on input
        characterGuessInput.addEventListener('input', updateDropdown);
        
        function updateDropdown() {
            // Clear the dropdown
            dropdownContainer.innerHTML = '';
            
            const inputValue = characterGuessInput.value.trim().toLowerCase();
            
            // If empty, don't show any suggestions
            if (!inputValue) {
                dropdownContainer.classList.add('hidden');
                return;
            }
            
            // Filter characters that start with the input value AND exclude already guessed characters
            const matchingCharacters = charactersDB.filter(character => 
                character.name.toLowerCase().startsWith(inputValue) && 
                !guesses.some(guess => guess.name.toLowerCase() === character.name.toLowerCase())
            );
            
            // If no matches, hide dropdown
            if (matchingCharacters.length === 0) {
                dropdownContainer.classList.add('hidden');
                return;
            }
            
            // Add matching character options to dropdown
            matchingCharacters.forEach(character => {
                const option = document.createElement('div');
                option.className = 'dropdown-option';
                
                // Create avatar element
                const avatar = document.createElement('img');
                avatar.src = character.image;
                avatar.alt = character.name;
                avatar.className = 'dropdown-avatar';
                
                // Create name element
                const name = document.createElement('span');
                name.textContent = character.name;
                
                // Add elements to option
                option.appendChild(avatar);
                option.appendChild(name);
                
                // Handle selection
                option.addEventListener('click', () => {
                    characterGuessInput.value = character.name;
                    dropdownContainer.classList.add('hidden');
                });
                
                dropdownContainer.appendChild(option);
            });
            
            // Show the dropdown
            dropdownContainer.classList.remove('hidden');
        }
        
        // Handle keyboard navigation in dropdown
        characterGuessInput.addEventListener('keydown', (e) => {
            const options = dropdownContainer.querySelectorAll('.dropdown-option');
            if (options.length === 0) return;
            
            // Find the currently focused option (if any)
            const focusedOption = dropdownContainer.querySelector('.dropdown-option.focused');
            let focusedIndex = -1;
            
            if (focusedOption) {
                focusedIndex = Array.from(options).indexOf(focusedOption);
                focusedOption.classList.remove('focused');
            }
            
            // Down arrow
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                focusedIndex = (focusedIndex + 1) % options.length;
                options[focusedIndex].classList.add('focused');
                options[focusedIndex].scrollIntoView({ block: 'nearest' });
            }
            // Up arrow
            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                focusedIndex = (focusedIndex - 1 + options.length) % options.length;
                options[focusedIndex].classList.add('focused');
                options[focusedIndex].scrollIntoView({ block: 'nearest' });
            }
            // Enter to select
            else if (e.key === 'Enter' && focusedIndex !== -1) {
                e.preventDefault();
                characterGuessInput.value = options[focusedIndex].querySelector('span').textContent;
                dropdownContainer.classList.add('hidden');
                handleGuess();
            }
        });
    }
}); 
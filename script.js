document.addEventListener('DOMContentLoaded', function() {
    // --- Typing Animation Logic ---
    const typingElement = document.getElementById('typing-animation');
    if (typingElement) {
        const textToType = typingElement.dataset.text || typingElement.innerText;
        typingElement.innerText = '';
        let index = 0;
        const typingSpeed = 150;
        function type() {
            if (index < textToType.length) {
                typingElement.innerText += textToType.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            }
        }
        setTimeout(type, 500);
    }

    // --- New Theme Switching Logic ---
    const themes = [
        { base: '#ffcdd2', accent: '#c62828' }, // Pastel Pink for Red particles
        { base: '#b3e5fc', accent: '#0277bd' }, // Pastel Blue for Blue particles
        { base: '#fff9c4', accent: '#f9a825' }, // Pastel Yellow for Yellow particles
        { base: '#c8e6c9', accent: '#2e7d32' }, // Pastel Green for Green particles
        { base: '#ffccbc', accent: '#d84315' }, // Pastel Orange for Orange particles
        { base: '#e1bee7', accent: '#6a1b9a' }, // Pastel Lavender for Purple particles
        { base: '#b2ebf2', accent: '#0097a7' }   // Pastel Cyan for Cyan particles
    ];

    const image = document.querySelector('.profile-pic');
    const root = document.documentElement;
    let currentThemeIndex = 4; // Start with light blue

    if (image) {
        image.addEventListener('click', function() {
            let newThemeIndex;
            do {
                newThemeIndex = Math.floor(Math.random() * themes.length);
            } while (newThemeIndex === currentThemeIndex);
            
            currentThemeIndex = newThemeIndex;
            const selectedTheme = themes[currentThemeIndex];

            // Update p5.js background color
            if (typeof currentBgColor !== 'undefined' && typeof color !== 'undefined') {
                currentBgColor = color(selectedTheme.base);
            }

            // Update CSS variables
            root.style.setProperty('--bg-color-base', selectedTheme.base);
            root.style.setProperty('--accent-color', selectedTheme.accent);
        });
    }
});
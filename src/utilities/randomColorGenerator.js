function getRandomPurpleShade() {
    const hue = Math.floor(Math.random() * 360); // Hue value for purple hues
    const saturation = Math.floor(Math.random() * 21) + 60; // Saturation between 60 and 80
    const lightness = Math.floor(Math.random() * 21) + 70; // Lightness between 70 and 90
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default getRandomPurpleShade;
export const getRandomNumber = (min = 1, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
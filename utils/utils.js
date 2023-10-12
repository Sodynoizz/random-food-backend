export const getRandomNumber = (min = 1, max) => {
    return Math.random() * (max - min) + min;
}
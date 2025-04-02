export const getWeatherData = async (city) => {
    const API_KEY = 'c54d13a228e8da84fdb4d899210e10f6'
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru&units=metric`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
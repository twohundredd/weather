import { getWeatherData } from "./api.js";
import { resetWeatherContent } from "./helper.js";

export const handleWeatherByGeo = () => {

    const API_GEO = '757b0ae29b8d4b4eaeabb49947fb65a1';

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    const success = async (pos) => {
        const coord = pos.coords;

        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${coord.latitude}&lon=${coord.longitude}&lang=ru&apiKey=${API_GEO}`);

        const result = await response.json();
        
        const weather = await getWeatherData(result.features[0].properties.city);
        resetWeatherContent(result.features[0].properties.city, weather);
    }

    const error = (err) => {
        console.log(err.code + ' ' + err.message);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
}
export interface WeatherType {
    base: string,
    main: {
        feels_like: number;
        humidity: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    },
    name: string;
}
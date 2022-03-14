export interface ForecastResponse {
	lat: number;
	lon: number;
	timezone: number;
	timezone_offset: number;
}

export interface ForecastHourlyResponse extends ForecastResponse {
	hourly: Hourly[];
}

export interface ForecastDailyResponse extends ForecastResponse {
	daily: Daily[];
}

export interface ForecastHourly extends ForecastHourlyResponse {
	cityName: string;
}

export interface ForecastDaily extends ForecastDailyResponse {
	cityName: string;
}

export interface Hourly {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: Weather[];
	pop: number;
}

export interface Daily {
	clouds: number;
	dew_point: number;
	dt: number;
	feels_like: FeelsLike;
	humidity: number;
	moon_phase: number;
	moonrise: number;
	moonset: number;
	pop: number;
	pressure: number;
	sunrise: number;
	sunset: number;
	temp: Temp;
	uvi: number;
	weather: Weather[];
	wind_deg: number;
	wind_gust: number;
	wind_speed: number;
}

export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface FeelsLike {
	day: number;
	night: number;
	eve: number;
	morn: number;
}

interface Temp {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
}
export type ForecastType = ForecastDaily | ForecastHourly;

import { ForecastDaily, ForecastHourly, ForecastMode } from '@bp/weather-forecast/services';
import { ForecastType } from '@bp/weather-forecast/services';

export interface HourlyTemp {
	time: number;
	temp: number;
}

export class Forecast {
	cityName: string;
	dateTimes: HourlyTemp[] = [];

	constructor(forecast: ForecastType, mode: ForecastMode) {
		this.cityName = forecast.cityName;
		this.dateTimes =
			mode === ForecastMode.Hourly
				? this.getHourlyDateTime(forecast as ForecastHourly)
				: this.getDailyDateTime(forecast as ForecastDaily);
	}

	private getHourlyDateTime(forecast: ForecastHourly): HourlyTemp[] {
		return forecast.hourly
			.filter((item, index) => index % 3 === 0)
			.slice(1, 9)
			.map(item => {
				return {
					time: item.dt,
					temp: Math.round(item.temp * 2) / 2,
				};
			});
	}

	private getDailyDateTime(forecast: ForecastDaily): HourlyTemp[] {
		return forecast.daily.slice(1, 8).map(item => {
			return {
				time: item.dt,
				temp: Math.round(item.temp.eve * 2) / 2,
			};
		});
	}
}

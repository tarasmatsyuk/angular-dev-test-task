import { Injectable } from '@angular/core';
import { ForecastMode } from './models/forecast-mode.enum';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { City } from './models/city.interface';
import { ForecastResponse } from './models/forecast.interface';
import { environment } from '../../../../../apps/weather-forecast/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {
	private _apiKey = '010721642521f31b0fbc8c3831d45951';
	private _limit = 1;
	private _units = 'metric';
	private exclude: Map<ForecastMode, string[]> = new Map([
		[ForecastMode.Hourly, ['current', 'minutely', 'daily', 'alerts']],
		[ForecastMode.Daily, ['current', 'minutely', 'hourly', 'alert']],
	]);

	constructor(private httpClient: HttpClient) {}

	getCity(q: string): Observable<City> {
		return this.httpClient
			.get<City[]>(`${environment.apiCoordinatesUrl}`, { params: { q, limit: this._limit, appid: this._apiKey } })
			.pipe(map(cities => cities[0]));
	}

	getForecast(lon: number, lat: number, mode: ForecastMode): Observable<ForecastResponse> {
		const exclude = this.exclude.get(mode)?.join(',') as string;

		return this.httpClient.get<ForecastResponse>(`${environment.apiForecastUrl}`, {
			params: { lon, lat, exclude, units: this._units, appid: this._apiKey },
		});
	}
}

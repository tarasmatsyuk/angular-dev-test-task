import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ForecastFacade } from '../../+state/forecast.facade';
import { filter, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ForecastMode } from '@bp/weather-forecast/services';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from '../../../utils/forecast';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'bp-forecast-list',
	templateUrl: './forecast-list.component.html',
	styleUrls: ['./forecast-list.component.scss'],
})
export class ForecastListComponent implements OnInit, OnDestroy {
	displayedColumns: string[] = [];
	dataSource!: MatTableDataSource<Forecast>;

	private destroy$: Subject<void> = new Subject();

	constructor(private forecastsFacade: ForecastFacade, private route: ActivatedRoute, private datePipe: DatePipe) {}

	ngOnInit(): void {
		this.loadForecast();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	loadForecast(): void {
		let forecastMode = ForecastMode.Hourly;
		this.route.queryParamMap
			.pipe(
				map(params => params.get('mode')),
				filter(Boolean),
				switchMap(mode => {
					forecastMode = Number(mode);
					return forecastMode === ForecastMode.Hourly ? this.loadHourlyForecast() : this.loadDailyForecast();
				}),
				takeUntil(this.destroy$)
			)
			.subscribe(forecast => {
				const timeColumnNames =
					forecastMode === ForecastMode.Hourly
						? this.getRestHourlyColumns(forecast)
						: this.getDailyColumns(forecast);
				this.displayedColumns = ['cityName', ...timeColumnNames];
				this.dataSource = new MatTableDataSource(forecast);
			});
	}

	private loadHourlyForecast(): Observable<Forecast[]> {
		return this.forecastsFacade.getHourlyForecast$.pipe(takeUntil(this.destroy$));
	}

	private loadDailyForecast(): Observable<Forecast[]> {
		return this.forecastsFacade.getDailyForecast$.pipe(takeUntil(this.destroy$));
	}

	private getRestHourlyColumns(forecast: Forecast[]): string[] {
		if (forecast.length) {
			return forecast[0].dateTimes.map(item => this.datePipe.transform(item.time * 1000, 'HH:mm')) as string[];
		} else {
			return [];
		}
	}

	private getDailyColumns(forecast: Forecast[]): string[] {
		if (forecast.length) {
			return forecast[0].dateTimes.map(item => this.datePipe.transform(item.time * 1000, 'EEEEEE')) as string[];
		} else {
			return [];
		}
	}
}

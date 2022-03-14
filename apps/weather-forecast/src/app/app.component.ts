import { Component } from '@angular/core';
import { Params, Router, RoutesRecognized } from '@angular/router';
import { ForecastMode } from '@bp/weather-forecast/services';
import { filter, map, take } from 'rxjs';
import { isEmptyMode } from '../../../../libs/forecast-layout/src/utils/utils';

@Component({
	selector: 'bp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	private readonly defaultQueryParams: Params = { mode: ForecastMode.Hourly };

	constructor(private router: Router) {
		this.router.events
			.pipe(
				filter((event): event is RoutesRecognized => !!event && event instanceof RoutesRecognized),
				take(1),
				map(event => event.state.root.queryParamMap.get('mode'))
			)
			.subscribe(mode => {
				if (isEmptyMode(Number(mode))) {
					this.router.navigate([], {
						queryParams: this.defaultQueryParams,
					});
				}
			});
	}
}

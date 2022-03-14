import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForecastMode } from '@bp/weather-forecast/services';
import { combineLatest, filter, map, Observable, Subject, take, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ForecastFacade } from '../../+state/forecast.facade';
import { isEmptyMode } from '../../../utils/utils';

@Component({
	selector: 'bp-forecast-search',
	templateUrl: './forecast-search.component.html',
	styleUrls: ['./forecast-search.component.scss'],
})
export class ForecastSearchComponent implements OnInit, OnDestroy {
	forecastFilterForm!: FormGroup;
	forecastMode = ForecastMode;

	selectedCity$ = this.forecastsFacade.selectedCity$;
	loading$: Observable<boolean>;
	error$: Observable<boolean>;

	private destroy$: Subject<void> = new Subject();

	constructor(
		private bf: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private forecastsFacade: ForecastFacade
	) {
		this.loading$ = combineLatest([
			this.forecastsFacade.getSelectedCityLoading$,
			this.forecastsFacade.getHourlyForecastLoading$,
			this.forecastsFacade.getDailyForecastLoading$,
		]).pipe(map(loadings => loadings.includes(true)));

		this.error$ = combineLatest([
			this.forecastsFacade.selectedCityError$,
			this.forecastsFacade.getHourlyForecastError$,
			this.forecastsFacade.getDailyForecastError$,
		]).pipe(map(errors => errors.find(error => error)));
	}

	ngOnInit(): void {
		this.initForm();
		this.subscribeToModeChange();
		this.subscribeToQueryParams();
	}

	initForm(): void {
		this.forecastFilterForm = this.bf.group({
			city: ['', [Validators.required, Validators.minLength(2)]],
			forecastMode: [ForecastMode.Hourly],
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	subscribeToQueryParams(): void {
		this.router.events
			.pipe(
				filter((event): event is RoutesRecognized => !!event && event instanceof RoutesRecognized),
				take(1),
				map(event => event.state.root.queryParamMap)
			)
			.subscribe(paramsMap => {
				const mode = Number(paramsMap.get('mode'));
				const city = paramsMap.get('city');
				this.forecastFilterForm.patchValue(
					{
						forecastMode: isEmptyMode(mode) ? ForecastMode.Hourly : mode,
						city,
					},
					{ emitEvent: false }
				);
			});
	}

	subscribeToModeChange(): void {
		this.forecastFilterForm
			.get('forecastMode')
			?.valueChanges.pipe(takeUntil(this.destroy$))
			.subscribe(mode => {
				this.router.navigate([], { queryParams: { mode }, queryParamsHandling: 'merge' });
			});
	}

	submit(): void {
		const city = this.forecastFilterForm.get('city')?.value as string;
		const mode = this.route.snapshot.queryParamMap.get('mode');
		this.forecastsFacade.findCity(city, Number(mode));
		this.forecastFilterForm.patchValue({ city: '' });
		this.router.navigate([], { queryParams: { city }, queryParamsHandling: 'merge' });
	}
}

import {takeLatest, put, call} from 'redux-saga/effects';
import {
  Actions,
  fetchWeatherFailure,
  fetchWeatherSuccess,
  WEATHER_START_TYPE,
} from './actions';
import weatherService from '../../services/WeatherService';

export default function* saga() {
  yield takeLatest(Actions.START, weatherStartWorker);
}

export function* weatherStartWorker(action: WEATHER_START_TYPE) {
  try {
    const weather = yield call(
      weatherService.fetchCurrentWeather,
      action.payload.latitude,
      action.payload.longitude,
    );
    yield put(fetchWeatherSuccess(weather));
  } catch (e) {
    yield put(fetchWeatherFailure(e.message));
  }
}

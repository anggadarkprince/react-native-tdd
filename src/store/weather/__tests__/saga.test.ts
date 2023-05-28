import {recordSaga} from '../../../utils/test.utils';
import {weatherStartWorker} from '../saga';
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from '../action';
import {nullWeather} from '../../../types/Weather';
import WeatherService from '../../../services/WeatherService';

describe('store/weather', () => {
  describe('sage', () => {
    describe('onStart', () => {
      test('Should call fetchWeather API and dispatch success action when successful', async () => {
        jest
          .spyOn(WeatherService, 'fetchCurrentWeather')
          .mockResolvedValueOnce(nullWeather);

        const dispatched = await recordSaga(
          weatherStartWorker,
          fetchWeather(0, 0),
        );

        expect(dispatched).toStrictEqual([fetchWeatherSuccess(nullWeather)]);
      });

      test('Should call fetchWeather API and dispatch failure action when unsuccessful', async () => {
        jest
          .spyOn(WeatherService, 'fetchCurrentWeather')
          .mockRejectedValueOnce(new Error('mock-error'));

        const dispatch = await recordSaga(
          weatherStartWorker,
          fetchWeather(0, 0),
        );
        expect(dispatch).toStrictEqual([fetchWeatherFailure('mock-error')]);
      });
    });
  });
});

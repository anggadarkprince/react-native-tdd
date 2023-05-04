import WeatherCurrent from '../WeatherCurrent';
import React from 'react';
import {render} from '@testing-library/react-native';

describe('WeatherCurrent', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByTestId('weather-current');
  });

  test('Should navigate to Weather screen with location', () => {
    throw new Error('Test not implemented yet');
  });
});
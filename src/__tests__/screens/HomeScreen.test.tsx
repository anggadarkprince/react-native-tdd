import {render} from '@testing-library/react-native';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen';

describe('HomeScreen', () => {
  test('Should render correctly', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen');
  });
});

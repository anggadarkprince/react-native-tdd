import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import App from '../App';
import AppNavigator from '../screens';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import store from '../store';

function add(a: number, b: number) {
  return a + b;
}

jest.mock('../screens', () => jest.fn());
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual<object>('react-redux'),
    Provider: jest.fn(),
  };
});

describe('App', () => {
  /*
  test('First test', () => {
    expect(add(1, 4)).toBe(5);
  });
  test('Should render correctly using react renderer', () => {
    renderer.create(<App />);
  });
  test('Should render correctly using testing library', () => {
    render(<App />);
  });
  test('Should render correctly and check app testId', () => {
    const wrapper = render(<App />);
    wrapper.getByTestId('app');
  });
  */

  test('Should render routes', () => {
    (Provider as jest.Mock).mockImplementationOnce(({children}) => children);
    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID={'mock-routes'} />,
    );
    const wrapper = render(<App />);
    wrapper.getByTestId('mock-routes');
  });

  test('Should render Provider', () => {
    let providerStore!: typeof store;
    (Provider as jest.Mock).mockImplementationOnce(({store}) => {
      providerStore = store;
      return <View testID={'mock-provider'} />;
    });
    const wrapper = render(<App />);
    wrapper.getByTestId('mock-provider');

    expect(providerStore).toBe(store);
  });
});

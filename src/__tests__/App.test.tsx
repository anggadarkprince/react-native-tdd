import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import App from '../App';

function add(a: number, b: number) {
  return a + b;
}

describe('App', () => {
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
});

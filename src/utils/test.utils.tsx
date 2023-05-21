import {createStore} from 'redux';
import rootReducer from '../store/reducers';
import React, {ElementType, ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {Provider} from 'react-redux';

const store = createStore(rootReducer);

type CustomRenderOption = {
  store?: typeof store;
};

const AllTheProvider = (options: CustomRenderOption) => ({
  children,
}: {
  children: ElementType;
}) => {
  return <Provider store={options.store || store}>{children}</Provider>;
};

const customRender = (
  ui: ReactElement,
  options: CustomRenderOption & Omit<RenderOptions, 'queries'> = {},
) => {
  const {store, ...others} = options;
  return render(ui, {
    wrapper: AllTheProvider({store}) as React.ComponentType,
    ...others,
  });
};

export * from '@testing-library/react-native';
export {customRender as render};

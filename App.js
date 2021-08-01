import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text>Hello World</Text>
      </SafeAreaView>
    </Provider>
  );
};

export default App;

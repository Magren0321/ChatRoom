import ReactDOM from 'react-dom';
import './index.css';
import Route from './router/';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './store/store';
import reportWebVitals from './reportWebVitals';
import FastClick from 'fastclick';

FastClick.attach(document.body);

// 监听state变化
// store.subscribe(() => {
//   console.log('store发生了变化');
// });

const render = (Component: any) => {
  ReactDOM.render(
    //绑定redux、热加载
    <Provider store={store}>
      <AppContainer>
        <Component/>
      </AppContainer>
    </Provider>,
    document.getElementById('root'),
  )
}

render(Route);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Route);
  })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

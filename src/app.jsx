/* eslint-disable perfectionist/sort-imports */
import { Provider } from 'react-redux';
import { store } from "./redux/store"; 
import 'src/global.css';  

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import HomePage from './pages/HomePage';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}

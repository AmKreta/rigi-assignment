import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import router from './routes/routes';
import "./index.css";
  

navigator.serviceWorker
.register('serviceworker.js',{scope:'/'})
.then((registration) => {
  console.log('Service Worker registered with scope:', registration.scope);
})
.catch((err) => {
  console.error('Service Worker registration failed:', err);
})
.finally(()=>{
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});


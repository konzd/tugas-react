// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar1";
import Footer from "./components/Footer";
import Beranda from "./beranda/Beranda";
import Detail from "./film_detail/Detail";
import { Provider } from "react-redux";
import store from "./store/store";
import RatedMovie from "./rated/RetedMovie";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/movies/:id" element={<Detail />} />
            <Route path="/rated" element={<RatedMovie />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import { createStore } from "redux";
import berandaReducer from "./reducer/BerandaReducer"; // Pastikan hanya ada satu import

const store = createStore(berandaReducer);
export default store;

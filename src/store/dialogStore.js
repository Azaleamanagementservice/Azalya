import { createStore } from "redux";
import reducer from "../reducers/dialogReducer"
const store=createStore(reducer)
export default store
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { adminLoginReducer, adminOtpReducer, adminRegisterReducer } from "./reducers/adminReducers";

const reducer = combineReducers({
  adminRegister:adminRegisterReducer,
  adminLogin: adminLoginReducer,
  adminOtp:adminOtpReducer
});

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
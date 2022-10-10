import {Routes, Route } from "react-router-dom";
import ForgotPassword from './ForgotPassword'
import ResetPassword from "./ResetPassword";

const App = () => {
  return (
      <Routes>
        <Route path='forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='/reset-password/:id/:token' element={<ResetPassword/>}></Route>
      </Routes>
  );
  
}
export default App;  


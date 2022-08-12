import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {

}

function Router({}: IRouterProps){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-coin/" element={<Coins />} />
        <Route path="/react-coin/:coinId/*" element={<Coin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
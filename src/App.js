import "./App.css";
import MyContext from "./Context/MyContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./Mainpage/Mainpage";
import Wingo from "./Wingo/Wingo";
import Activity from "./Activity/Activity";
import Promotion from "./Promotion/Promotion";
import Wallet from "./Wallet/Wallet";
import Account from "./Account/Account";
import Deposit from "./Account/Deposit/Deposit";
import VerifyUTR from "./Account/Deposit/VerifyUTR";

import Footer from "./Footer/Footer";
import Withdraw from "./Withdraw/Withdraw";
import AddBeneficiary from "./Withdraw/AddBeneficiary";
import Signup from "./Signuplogin/Signup";
import Login from "./Signuplogin/Login";
import Deposithistory from "./Gamehistory/Deposithistory";
import Withdrawhistory from "./Gamehistory/Withdrawhistory";
import Gamehistory from "./Gamehistory/Gamehistory";
import Transactionhistory from "./Gamehistory/Transactionhistory";
import Paygate1 from "./Account/Deposit/Paygate1";
import Paygate2 from "./Account/Deposit/Paygate2";
import Wingo2 from "./Wingo/Wingo2";
import Notification from "./Pages/Notification";
import Gifts from "./Pages/Gifts";
import GameStatistics from "./Pages/GameStatistics";
import Settings from "./Pages/Settings";
import Feedback from "./Pages/Feedback";
import Announcement from "./Pages/Announcement";
import CustomerService from "./Pages/CustomerService";
import Guide from "./Pages/Guide";
import About from "./Pages/About";
import Vip from "./Pages/Vip";
import Safe from "./Pages/Safe";
import SubordinateData from "./Pages/SubordinateData";
import CommissionDetail from "./Pages/CommissionDetail";
import InvitationRules from "./Pages/InvitationRules";
import RebateRatio from "./Pages/RebateRatio";
import AgentService from "./Pages/AgentService";

function App() {
  return (
    <>
      <MyContext>
        <Router>
          <Routes>

              <Route exact path="/" element={<Mainpage/>} />
              <Route exact path="/wingo" element={<Wingo/>} />
            
             
              <Route exact path="/activity" element={<Activity/>} />
              <Route exact path="/promotion" element={<Promotion/>} />
              <Route exact path="/wallet" element={<Wallet/>} />
              <Route exact path="/account" element={<Account/>} />
              <Route exact path="/deposit" element={<Deposit/>} />
              <Route exact path="/deposit/verify-utr" element={<VerifyUTR/>} />
              <Route exact path="/withdraw" element={<Withdraw/>} />
              <Route exact path="/add-beneficiary" element={<AddBeneficiary/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
              <Route exact path="/deposithistory" element={<Deposithistory/>} />
              <Route exact path="/withdrawhistory" element={<Withdrawhistory/>} />
              <Route exact path="/gamehistory" element={<Gamehistory/>} />

              <Route exact path="/transachistory" element={<Transactionhistory/>} />



              <Route exact path="/deposit/paygate1" element={<Paygate1/>} />
              <Route exact path="/deposit/paygate2" element={<Paygate2/>} />
              <Route exact path="/notification" element={<Notification/>} />
              <Route exact path="/gifts" element={<Gifts/>} />
              <Route exact path="/gamestatistics" element={<GameStatistics/>} />
              <Route exact path="/settings" element={<Settings/>} />
              <Route exact path="/feedback" element={<Feedback/>} />
              <Route exact path="/announcement" element={<Announcement/>} />
              <Route exact path="/customerservice" element={<CustomerService/>} />
              <Route exact path="/guide" element={<Guide/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/vip" element={<Vip/>} />
              <Route exact path="/safe" element={<Safe/>} />
              <Route exact path="/subordinate-data" element={<SubordinateData/>} />
              <Route exact path="/commission-detail" element={<CommissionDetail/>} />
              <Route exact path="/invitation-rules" element={<InvitationRules/>} />
              <Route exact path="/rebate-ratio" element={<RebateRatio/>} />
              <Route exact path="/agent-service" element={<AgentService/>} />


              
            </Routes>
            <Footer/>

          </Router>
      </MyContext>
    </>
  );
}

export default App;

import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyContext } from '../Context/MyContext';

function Lottrybalance() {
  const context = useContext(MyContext)

  const {usebalance} = context;

  // console.log(usebalance,"this is user balanec")

 

    
  return (
    <>
    <div data-v-ed6673b8="" data-v-f9e6ba25="" class="Wallet__C">
          <div data-v-ed6673b8="" class="Wallet__C-balance">
            <div data-v-ed6673b8="" class="Wallet__C-balance-l1">
              <div data-v-ed6673b8="">₹{usebalance}</div>
            </div>
            <div data-v-ed6673b8="" class="Wallet__C-balance-l2">
              <div data-v-ed6673b8="">Wallet balance</div>
            </div>
            <div data-v-ed6673b8="" class="Wallet__C-balance-l3">
              <div data-v-ed6673b8=""> <Link to="/withdraw">Withdraw</Link>  </div>
              <div data-v-ed6673b8="">  <Link to="/deposit">Deposit</Link></div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Lottrybalance

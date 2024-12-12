import { useState } from "react";

import ActionButton from "../components/ActionButton";

function Topup() {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e) => {
    const val = e.target.validity.valid ? e.target.value : amount;

    setAmount(val);
  };

  return (
    <section className="w-full px-16 pt-12 bg-[#fafbfd] dark:bg-[#3E3E42]">
      <div className="w-1/2 mx-auto">
        <h1 className="font-bold text-5xl">Topup</h1>
        <div className="mt-6 shadow-[0_0_10px_0_rgba(91,91,91,0.1)] bg-white py-[56px] px-[56px] rounded-[20px]">
          <div className="pt-5 px-8 pb-9 bg-[#FAFBFD] rounded-[20px]">
            <h2 className="font-semibold">Amount</h2>
            <span className="font-semibold">IDR</span>
            <input
              name="amount"
              type="text"
              pattern="[0-9]*"
              value={amount}
              onChange={handleAmountChange}
              className="bg-[#FAFBFD] outline-none ml-2 mt-2 font-semibold"
            />
          </div>
          <div className="w-full mt-7 flex shadow-[0_0_10px0_rgba(91, 91, 91, 0.1)]">
            <button className="absolute z-50 py-4 px-8 bg-[#EDEDED] rounded-[20px] font-bold text-2xl">
              <label htmlFor="to">From</label>
            </button>
            <select
              name="to"
              id="to"
              className="relative w-full bg-[#FAFBFD] text-[#737373] py-5 pr-4 pl-8 ml-[100px] rounded-[10px] border-r-8 border-transparent outline-none"
            >
              <option value="credit_card">Credit Card</option>
            </select>
          </div>
          <div className="py-4 px-8 mt-7 bg-[#FAFBFD] rounded-[20px]">
            <label htmlFor="notes" className="font-semibold">
              Notes:
            </label>
            <input
              name="notes"
              type="text"
              className="bg-[#fafbfd] outline-none ml-2"
            />
          </div>
          {/* {isBalanceLacking && (
            <p className="mt-2 text-red-500">Maaf, saldo Anda kurang</p>
          )} */}
          <div className="flex flex-col mt-[60px]">
            <ActionButton onClick={() => {}}>Topup</ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Topup;

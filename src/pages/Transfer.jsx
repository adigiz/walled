import { useState } from "react";

import ActionButton from "../components/ActionButton";
import useFetch from "../hooks/useFetch";
import axios from "axios";

function Transfer() {
  const [topupData, setTopupData] = useState({
    amount: 0,
    desc: "",
    recipientId: "",
  });
  const [isBalanceLacking, setIsBalanceLacking] = useState(false);
  const { data: profile } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/profile`,
    localStorage.getItem("login")
  );

  const handleInputChange = (e) => {
    setTopupData({ ...topupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/transactions/transfer`,
        {
          amount: topupData.amount,
          desc: topupData.desc,
          recipientId: topupData.recipientId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full min-h-screen px-16 pt-12 bg-[#fafbfd] dark:bg-[#3E3E42]">
      <div className="w-1/2 mx-auto">
        <h1 className="font-bold text-5xl dark:text-white">Transfer</h1>
        <div className="mt-6 shadow-[0_0_10px_0_rgba(91,91,91,0.1)] bg-white py-[56px] px-[56px] rounded-[20px]">
          <div className="w-full flex shadow-[0_0_10px_0_rgba(91,91,91,0.1)] rounded-l-[20px]">
            <button className="absolute z-50 py-4 px-8 bg-[#EDEDED] rounded-[20px] font-bold text-2xl">
              <label htmlFor="to">To</label>
            </button>
            <input
              name="recipientId"
              type="text"
              pattern="[0-9]*"
              value={topupData.recipientId}
              onChange={handleInputChange}
              className="relative w-full bg-[#FAFBFD] text-[#737373] py-5 pr-4 pl-8 ml-[70px] rounded-[10px] border-r-8 border-transparent outline-none"
            />
          </div>
          <div className="pt-5 px-8 pb-9 mt-7 bg-[#FAFBFD] rounded-[20px]">
            <h2 className="font-semibold">Amount</h2>
            <div className="flex items-center mt-2">
              <span className="font-semibold">IDR</span>
              <input
                name="amount"
                type="text"
                pattern="[0-9]*"
                value={topupData.amount}
                onChange={handleInputChange}
                className="bg-[#FAFBFD] outline-none ml-2 font-semibold w-full"
              />
            </div>
          </div>
          <p className="mt-2.5 text-[#26AA99] font-semibold">
            Balance: IDR{" "}
            {new Intl.NumberFormat("id-ID").format(profile?.balance)}
          </p>
          <div className="flex items-center py-4 px-8 mt-7 bg-[#FAFBFD] rounded-[20px]">
            <label htmlFor="notes" className="font-semibold">
              Notes:
            </label>
            <input
              name="desc"
              type="text"
              value={topupData.desc}
              onChange={handleInputChange}
              className="bg-[#fafbfd] outline-none ml-2 w-full"
            />
          </div>
          {isBalanceLacking && (
            <p className="mt-2 text-red-500">Maaf, saldo Anda kurang</p>
          )}
          <div className="flex flex-col mt-[60px]">
            <ActionButton
              onClick={() => {
                handleSubmit();
              }}
            >
              Transfer
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transfer;

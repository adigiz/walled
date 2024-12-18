import { useState } from "react";

import viewIcon from "../assets/view.png";
import ActionButton from "./ActionButton";
import plusIcon from "../assets/plus.svg";
import sendIcon from "../assets/send.svg";
import Avatar from "./Avatar";
import Transaction from "./Transaction";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router";

function Hero() {
  const [showBalance, setShowBalance] = useState(true);
  const { data: profile } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/profile`,
    localStorage.getItem("login")
  );
  const { data: transactions } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/transactions`,
    localStorage.getItem("login")
  );
  const navigate = useNavigate();

  const handleNavigateTopup = () => {
    navigate("/topup");
  };

  const handleNavigateTransfer = () => {
    navigate("/transfer");
  };

  return (
    <section className="w-full px-16 pt-12 bg-[#fafbfd] dark:bg-[#3E3E42]">
      <div className="flex items-center justify-center">
        <div className="mr-auto">
          <h1 className="text-black text-6xl font-bold dark:text-white">
            Good Morning, {profile?.name}!
          </h1>
          <p className="text-black text-2xl mt-3 dark:text-white">
            Check all your incoming and outgoing transactions here
          </p>
        </div>
        <Avatar name={profile?.name} avatarUrl={profile?.avatar_url} />
      </div>
      <div className="flex mt-[4.5rem] gap-x-12">
        <div className="bg-[#19918F] p-12 rounded-2xl w-1/5">
          <p className="text-white">Account No.</p>
          <p className="mt-3 font-bold text-white">{profile?.account_number}</p>
        </div>
        <div className="flex justify-between bg-white p-12 rounded-2xl w-full text-black dark:bg-[#2d2d30]">
          <div>
            <p className="dark:text-white">Balance</p>
            <span className="flex items-center mt-3 gap-x-2">
              <p className="font-bold dark:text-white">
                {showBalance
                  ? `${parseInt(profile?.balance).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}`
                  : "Rp ********"}
              </p>
              <img
                src={viewIcon}
                alt="view"
                className="w-4 h-4 object-cover cursor-pointer"
                onClick={() => setShowBalance((prev) => !prev)}
              />
            </span>
          </div>
          <div className="flex gap-x-6">
            <ActionButton onClick={handleNavigateTopup}>
              <img src={plusIcon} alt="plus icon" className="w-8 h-8" />
            </ActionButton>
            <ActionButton onClick={handleNavigateTransfer}>
              <img src={sendIcon} alt="send icon" className="w-8 h-8" />
            </ActionButton>
          </div>
        </div>
      </div>
      <Transaction userId={profile?.id} transactions={transactions} />
    </section>
  );
}

export default Hero;

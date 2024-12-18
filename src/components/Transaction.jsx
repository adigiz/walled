import { useState } from "react";

const TABLE_HEAD = [
  "Date & Time",
  "Type",
  "From / To",
  "Description",
  "Amount",
];

function Transaction({ userId, transactions }) {
  const [page, setPage] = useState(0);

  return (
    <div>
      <div className="flex w-full mx-auto mt-10 justify-between">
        <input
          name="search"
          type="text"
          placeholder="Search"
          className="w-[300px] h-[50px] rounded-[10px] pl-6 shadow-[0_0_10px_0_rgba(91,91,91,0.1)]"
        />
        <div className="flex">
          <div className="flex gap-x-4 items-center mr-12">
            <p className="text-[#737373]">Show</p>
            <select
              name="limit"
              id="limit"
              className="text-[#737373] py-3 px-4 rounded-[10px] border-r-8 border-transparent bg-white shadow-[0_0_10px_0_rgba(91,91,91,0.1)]"
            >
              <option value="10">Limit 10 transactions</option>
              <option value="20">Limit 20 transactions</option>
            </select>
          </div>
          <div className="flex gap-x-2 items-center">
            <p className="text-[#737373] mr-3">Sort by</p>
            <select
              name="date"
              id="date"
              className="text-[#737373] py-3 px-4 rounded-[10px] border-r-8 border-transparent bg-white shadow-[0_0_10px_0_rgba(91,91,91,0.1)]"
            >
              <option value="date">Date</option>
            </select>
            <select
              name="sortby"
              id="sortby"
              className="text-[#737373] py-3 px-4 rounded-[10px] border-r-8 border-transparent bg-white shadow-[0_0_10px_0_rgba(91,91,91,0.1)]"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto">
        <table className="table-auto text-black border-collapse border border-slate-500 mt-10 w-full overflow-hidden">
          <thead className="bg-white">
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="text-left border border-[#EDEDED] py-2 px-4 dark:bg-[#2d2d30] dark:text-white"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions?.length > 0 &&
              transactions
                ?.slice(page * 10, page * 10 + 10)
                .map((transaction, index) => {
                  const date = new Date(transaction.date);
                  const time = date.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const dayMonthYear = date.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  });
                  const formattedDate = `${time} - ${dayMonthYear}`;

                  const isDebit =
                    parseInt(userId) !== transaction.recipient_id &&
                    transaction.type !== "TOP UP";

                  return (
                    <tr
                      key={index}
                      className={`${isDebit ? "bg-[#F6F6F6]" : "bg-white"}`}
                    >
                      <td className="border border-[#EDEDED] py-2 px-4">
                        {formattedDate}
                      </td>
                      <td className="border border-[#EDEDED] py-2 px-4">
                        {transaction.type === "TOP UP"
                          ? "TOP UP"
                          : isDebit
                          ? "DEBIT"
                          : "CREDIT"}
                      </td>
                      <td className="border border-[#EDEDED] py-2 px-4">
                        {transaction.type !== "TOP UP"
                          ? `${transaction.sender_id} / ${transaction.recipient_id}`
                          : ""}
                      </td>
                      <td className="border border-[#EDEDED] py-2 px-4">
                        {transaction.description}
                      </td>
                      <td
                        className={`border border-[#EDEDED] py-2 px-4 ${
                          isDebit ? "text-red-500" : "text-[#219653]"
                        }`}
                      >
                        {isDebit ? "-" : "+"}{" "}
                        {new Intl.NumberFormat("id-ID").format(
                          transaction.amount
                        )}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <div className="pt-10 pb-4">
          <button
            className="font-bold px-5 py-[9.5px] border-2 border-[#E9E9E9] rounded-l-md dark:bg-white"
            onClick={() => setPage(0)}
          >
            First
          </button>
          {Array.from(
            { length: Math.ceil(transactions?.length / 10) },
            (_, i) => i + 1
          ).map((item, index) => (
            <button
              key={index}
              className={`font-bold px-5 py-[9.5px] border-t-[#E9E9E9] border-y-2 dark:bg-white ${
                page === index && "bg-[#19918F] text-white"
              }`}
              onClick={() => setPage(index)}
            >
              {item}
            </button>
          ))}
          <button
            className="font-bold px-5 py-[9.5px] border-2 border-[#E9E9E9] rounded-r-md dark:bg-white"
            onClick={() => {
              console.log("PAGE", page);

              setPage((prev) => prev + 1);
            }}
            disabled={page === Math.floor(transactions?.length / 10)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transaction;

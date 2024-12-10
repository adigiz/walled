import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

function NavItems({ menu }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    if (activeTab === "Sign Out") {
      localStorage.removeItem("login");
      return navigate("/");
    }
  });

  return (
    <ul className="flex gap-x-8 text-black">
      {menu.map((item) => {
        return (
          <NavLink
            key={item.title}
            to={item.link}
            className={({ isActive }) => {
              return isActive ? "text-[#19918F] font-bold" : "text-black";
            }}
            onClick={() => setActiveTab(item.title)}
          >
            {item.title}
          </NavLink>
        );
      })}
    </ul>
  );
}

export default NavItems;

import avatarImg from "../assets/avatar.png";

function Avatar({ isAvatarActive, setIsAvatarActive }) {
  console.log(isAvatarActive);

  return (
    <div className="flex items-center gap-x-4 ml-auto">
      <span className="text-right">
        <p className="text-black font-bold">Chelsea Immanuela</p>
        <p className="text-black">Personal Account</p>
      </span>
      <div
        className={`rounded-full border-[6px] hover:border-[6px] hover:border-[#178F8D] cursor-pointer transition-all ${
          isAvatarActive ? "border-[#178F8D]" : "border-[#fafbfd]"
        }`}
        onClick={() => setIsAvatarActive((prev) => !prev)}
      >
        <img
          src={avatarImg}
          alt="avatar"
          className="rounded-full"
          //   onClick={() => setIsAvatarActive((prev) => !prev)}
        />
      </div>
    </div>
  );
}

export default Avatar;

function NavItems({ menu }) {
  return (
    <ul className="flex gap-x-8 text-black">
      {menu.map((item) => {
        return (
          <a
            key={item.title}
            href={item.link}
            className="hover:text-[#19918F] hover:font-bold"
          >
            {item.title}
          </a>
        );
      })}
    </ul>
  );
}

export default NavItems;

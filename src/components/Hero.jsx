import Avatar from "./Avatar";

function Hero() {
  return (
    <section className="w-full px-16 mt-12">
      <div className="flex items-center justify-center">
        <div className="mr-auto">
          <h1 className="text-black text-6xl font-bold">
            Good Morning, Chelsea!
          </h1>
          <p className="text-black text-2xl mt-3">
            Check all your incoming and outgoing transactions here
          </p>
        </div>
        <Avatar />
      </div>
    </section>
  );
}

export default Hero;

import RippleButton from "../Shared/RippleButton";
import Planet from "./Planet";
const Home = () => {
  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen w-full p-0">
      {/* title */}
      <div className="bg-transparent fixed z-10 top-5">
      <h1 className="font-jersey text-white text-6xl shining-title">Life on Titan</h1>
      </div> 
       <div className="fixed z-10  bottom-5">
        <h2 className="font-lato text-white text-xl"> click on the planet to explore</h2>
      </div>
      {/* planet */}
      <Planet texturePath={'./src/assets/img/titan.jpg'}/>
      {/* buttons */}
      <div className="hidden">
        <RippleButton onClick={(e) => console.log(e)}>Previous</RippleButton>
        <RippleButton onClick={(e) => console.log(e)}>Next</RippleButton>
      </div>
    </div>
  );
};

export default Home;

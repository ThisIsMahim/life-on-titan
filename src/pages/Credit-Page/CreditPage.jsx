import RippleButton from "../Shared/RippleButton";
import './style.css'
const CreditPage = () => {
  return (
    <div className="relative">
      <div className="text-5xl bg-transparent font-bold text-black flex-col gap-10 font-vt w-screen h-screen flex justify-center items-center">
        <h1>
          Thanks for <span className="text-green-600">Learning</span> from{" "}
          <span className="text-yellow-600">Life On Titan!</span>
        </h1>
        <RippleButton navigateTo={"/"}>Return Home</RippleButton>
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default CreditPage;

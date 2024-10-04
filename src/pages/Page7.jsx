import Titan from './Shared/Titan'
import RippleButton from './Shared/RippleButton'
const Page7 = () => {
  return (
    <div className='relative h-screen w-screen'>
        <div className='absolute top-20 z-20 w-full flex justify-center'>
            <h1 className='text-white font-vt max-w-[800px] font-bold text-5xl text-center'>Lets Discover!</h1>
        </div>
        <div className='absolute bottom-20 z-20 w-full flex justify-center'>
            <h1 className='text-white font-vt max-w-[400px] font-bold text-xl text-center'>Rotate the Planet to discover the locations of Cryo-volcanos, Mineral Regions and Hydro-thermal vents around the planet!</h1>
        </div>
        <Titan/>
        <div className="fixed w-full bottom-0 flex justify-between px-10 z-20">
        <RippleButton navigateTo="/page6">Previous</RippleButton>
        <RippleButton navigateTo="/quizPage">Next</RippleButton>
      </div>
    </div>
  )
}

export default Page7
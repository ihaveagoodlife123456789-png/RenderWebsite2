
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function FrontPage() {

  return (
    <div className="size-full text-[35px] bg-[url('/winter-mountain-5120x2880-24311.jpg')] bg-no-repeat bg-cover bg-center flex flex-col text-slate-200">
      <div className="absolute top-12 w-[52%] h-[7%] left-[25%] bg-slate-700/70 rounded-[12px]"></div>
      <div className="absolute top-15 right-[10%] w-[5%] h-[5%] bg-blue-700 rounded-[13px] text-center"></div>
      <div className="w-full h-[82%] flex flex-col justify-center items-center gap-20">
        <h1 className="font-bold text-[48px] text-orange-400/90">Ascended Horizons</h1>
        <h4 className="text-[24px] leading-[42px] font-semibold text-slate-950 text-center">Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. <br />Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. <br />Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.</h4>
        <Link to='/form'><motion.h2 className="font-semibold text-[24px] py-2 px-4 text-white bg-blue-600/80 border-blue-800 border-[3px] rounded-[15px]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>Write a Message</motion.h2></Link>
      </div>
      <div className="absolute bottom-0 border-t-2 border-slate-950/70 w-full h-[18%] bg-slate-950/30 flex justify-center items-center gap-20 border-slate-400 border-[1px]">
        <Link to='/users'><motion.h2 className="font-semibold text-[24px] text-blue-600/90" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>View Users</motion.h2></Link>
      </div>
      <img src="/icons8-wreath-64.png" className="absolute top-16 left-16 size-[100px]"/>
    </div>
  )
}
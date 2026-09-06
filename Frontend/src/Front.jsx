
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function FrontPage() {

  return (
    <div className="size-full text-[35px] bg-[url('/winter-mountain-5120x2880-24311.jpg')] bg-no-repeat bg-cover bg-center flex flex-col text-slate-200">
      <div className="w-full h-[60%] flex flex-col justify-center items-center gap-8">
        <h1 className="font-bold text-[38px]">Ascended Horizons</h1>
        <h4 className="font-[18px] font-semibold">Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. <br />Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. <br />Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.</h4>
      </div>
      <div className="absolute bottom-0 w-full h-[40%] bg-slate-950/30 flex justify-center items-center gap-20 border-slate-400 border-[1px]">
        <Link to='/form'><motion.h2 className="font-bold text-blue-600/90" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>Write a Message</motion.h2></Link>
        <Link to='/users'><motion.h2 className="font-bold text-blue-600/90" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>View Users</motion.h2></Link>
      </div>
      <img src="/icons8-wreath-64.png" className="absolute top-12 left-12"/>
    </div>
  )
}
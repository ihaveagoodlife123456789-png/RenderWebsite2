
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function FrontPage() {

  return (
    <motion.div className="size-full text-[35px] flex flex-col text-slate-200 snap-start">
      <div className="fixed flex items-center justify-center gap-5 text-white font-semibold text-[22px] top-12 w-[52%] h-[7%] left-[25%] bg-slate-600/70 rounded-[12px]">
      <div className="size-fit absolute left-5 flex flex-col items-center justify-center">
      <motion.div className="text-[25px] font-bold text-indigo-800 border-b-0 border-indigo-600" initial={{scale: 0.3, y: -30}} animate={{scale: 1, y: 0}} transition={{duration: .1}} whileHover={{borderBottomWidth: '4px', pointer: 'cursor'}}>Ascended Horizons</motion.div>
      </div>
      <motion.h4 className="size-fit" initial={{scale: 1, opacity: 0, color: 'white'}} animate={{ opacity: 1}} whileHover={{ scale: 1.08, color: 'orange', pointer: 'cursor'}}>About</motion.h4>
      <motion.h4 className="size-fit" initial={{scale: 1, opacity: 0, color: 'white'}} animate={{ opacity: 1}} whileHover={{ scale: 1.08, color: 'orange', pointer: 'cursor'}}>Company</motion.h4>
      <motion.h4 className="size-fit" initial={{scale: 1, opacity: 0, color: 'white'}} animate={{ opacity: 1}} whileHover={{ scale: 1.08, color: 'orange', pointer: 'cursor'}}>Explore</motion.h4>
      <motion.h4 className="size-fit" initial={{scale: 1, opacity: 0, color: 'white'}} animate={{ opacity: 1}} whileHover={{ scale: 1.08, color: 'orange', pointer: 'cursor'}}>Services</motion.h4>
      <motion.h2 className="size-fit absolute right-5 text-[26px] text-violet-500" initial={{scale: 1}} whileHover={{scale: 1.08, color: 'white', pointer: 'cursor'}}>Sign In</motion.h2>
      </div>
      <motion.div className="size-fit py-2 px-3 fixed font-bold text-[26px] top-15 right-[10%] bg-blue-700 rounded-[13px] text-white " initial={{scale: 1, color:'white', backgroundColor: '#1d4ed8'}} whileHover={{scale: 1.08, color: '#1d4ed8', backgroundColor: 'white', pointer: 'cursor'}}>Login</motion.div>
      <div className="w-full h-[88%] flex flex-col justify-center items-center gap-20">
        <h1 className="font-bold text-[48px] text-orange-400/90">Ascended Horizons</h1>
        <h4 className="text-[24px] leading-[42px] font-semibold text-slate-950 text-center">Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. <br />Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. <br />Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.</h4>
        <Link to='/form'><motion.h2 className="font-semibold text-[24px] py-2 px-4 text-white bg-blue-600/80 border-blue-700/70 border-[3px] rounded-[15px]" initial={{ opacity: 0, y: -20, color: 'white', backgroundColor: '#2563eb', borderColor: '#1d4ed8' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08, color: '#2563eb', backgroundColor: 'white', borderColor: 'none'}}>Write a Message</motion.h2></Link>
      </div>
      <div className="absolute bottom-0 border-t-2 border-slate-800/70 w-full h-[12%] bg-slate-950/30 flex flex-col justify-center items-center gap-2">
        <h2 className="text-[24px] text-white">More Here</h2>
        <motion.div style={{rotate: '90deg'}} initial={{y: 0}} animate={{y: [0, 10, 0, -10, 0]}} transition={{duration: 2, repeat: Infinity, ease: 'linear'}}>{'>'}</motion.div>
      </div>
      <img src="/icons8-wreath-64.png" className="fixed top-16 left-16 size-[100px]"/>
    </motion.div>
  )
}

/* drag="y" dragConstraints={{ top: 600, bottom: 0 }} dragElastic={0} dragMomentum={true}*/
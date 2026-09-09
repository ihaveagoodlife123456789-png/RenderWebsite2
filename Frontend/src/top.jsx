
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useRef } from 'react'

export function TopPage() {

  const ref = useRef(null)

  const scroll = (e) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollExplore = (e) => {
  e.preventDefault();
  
  const scrollContainer = document.querySelector('.overflow-y-scroll');

  scrollContainer.style.scrollSnapType = 'none';
  
  const element = document.getElementById('explore');
  element?.scrollIntoView({ behavior: 'smooth' });
  
  setTimeout(() => {
   scrollContainer.style.scrollSnapType = 'y mandatory';
  }, 800);
}

  return (
    <motion.div className="size-full text-[35px] flex flex-col text-slate-200 snap-start scroll-smooth" 
    ref={ref}
    initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
    >
      <div className="fixed flex items-center justify-center gap-5 text-white font-semibold sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] top-12 w-[52%] h-[7%] left-[25%] bg-slate-600/70 rounded-[12px]">
      <div className="size-fit flex flex-col items-center justify-center">
      <motion.a href="#top" onClick={scroll} className="sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] font-bold text-indigo-800 border-b-0 border-indigo-600" initial={{scale: 0.3, y: -30}} animate={{scale: 1, y: 0}} transition={{duration: .1}} whileHover={{borderBottomWidth: '4px', pointer: 'cursor'}}>Ascended Horizons</motion.a>
      </div>
      <motion.h4 className="size-fit" initial={{scale: 1, opacity: 0, color: 'white'}} animate={{ opacity: 1}} whileHover={{ scale: 1.08, color: 'orange', pointer: 'cursor'}}>About</motion.h4>
      <motion.h4 className="size-fit" initial={{scale: 1, opacity: 0, color: 'white'}} animate={{ opacity: 1}} whileHover={{ scale: 1.08, color: 'orange', pointer: 'cursor'}}>Company</motion.h4>
      <motion.a className="size-fit" initial={{scale: 1, opacity: 0, color: 'white'}} animate={{ opacity: 1}} whileHover={{ scale: 1.08, color: 'orange', pointer: 'cursor'}}  href="#explore" onClick={scrollExplore}>Explore</motion.a>
      <motion.a className="size-fit" initial={{scale: 1, opacity: 0, color: 'white'}} animate={{ opacity: 1}} whileHover={{ scale: 1.08, color: 'orange', pointer: 'cursor'}}>Services</motion.a>
      <motion.h2 className="size-fit absolute right-5 sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] text-violet-500" initial={{scale: 1}} whileHover={{scale: 1.08, color: 'white', pointer: 'cursor'}}>Sign In</motion.h2>
      </div>
      <motion.div className="size-fit py-2 px-3 fixed font-bold text-[26px] top-15 sm:right-[4%] md:right-[5%] lg:right-[6%] xl:right-[8%] 2xl:right-[10%] bg-blue-700 rounded-[13px] text-white " initial={{scale: 1, color:'white', backgroundColor: '#1d4ed8'}} whileHover={{scale: 1.08, color: '#1d4ed8', backgroundColor: 'white', pointer: 'cursor'}}>Login</motion.div>
      <div className="w-full h-[88%] flex flex-col justify-center items-center gap-20">
        <h1 className="font-bold sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-orange-400/90">Ascended Horizons</h1>
        <h4 className="text-sm sm:font-serif sm:text-base md:text-lg lg:text-xl leading-[42px] font-semibold text-slate-950 text-center">Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. <br />Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. <br />Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.</h4>
        <Link to='/form'><motion.h2 className="font-semibold sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] py-2 px-4 text-white bg-blue-600/80 border-blue-700/70 border-[3px] rounded-[15px]" initial={{ opacity: 0, y: -20, color: 'white', backgroundColor: '#2563eb', borderColor: '#1d4ed8' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08, color: '#2563eb', backgroundColor: 'white', borderColor: 'none'}}>Write a Message</motion.h2></Link>
      </div>
      <div className="relative bottom-0 border-t-2 border-slate-800/70 w-full h-[12%] bg-slate-950/30 flex flex-col justify-center items-center gap-2">
        <a href="#explore" onClick={scrollExplore} className="text-[24px] text-white">More Here</a>
        <motion.a href="#explore" onClick={scrollExplore} style={{rotate: '90deg'}} initial={{y: 0}} animate={{y: [0, 10, 0, -10, 0]}} transition={{duration: 2, repeat: Infinity, ease: 'linear'}}>{'>'}</motion.a>
      </div>
      <img src="/icons8-wreath-64.png" className="fixed top-8 sm:left-9 md:left-10 lg:left-12 xl:left-14 2xl:left-16 size-[100px]"/>
    </motion.div>
  )
}
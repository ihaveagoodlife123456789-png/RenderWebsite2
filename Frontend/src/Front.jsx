
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function FrontPage() {

  return (
    <div className="size-full text-[35px] bg-[url('/santa-aesthetic-5120x3413-13338.jpg')] bg-no-repeat bg-cover flex justify-center items-center gap-12 font-semibold text-slate-200">
      <div className="relative w-full h-[25%] bg-slate-950/20 flex justify-center items-center gap-20">
        <Link to='/form'><motion.h2
        className="font-bold text-slate-300/90"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.08}}
        >Write a Message</motion.h2></Link>
        <Link to='/users'><motion.h2
        className="font-bold text-slate-300/90"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.08}}
        >View Users</motion.h2></Link>
      </div>
      <img src="/icons8-wreath-64.png" className="absolute top-12 left-12"/>
    </div>
  )
}
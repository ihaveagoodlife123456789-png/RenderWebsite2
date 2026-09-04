
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function FrontPage() {

  return (
    <div className="size-full text-[35px] bg-[url('/christmas-tree-3840x2160-14452.jpg')] bg-no-repeat bg-cover flex justify-center items-center gap-12 font-semibold text-slate-200">
      <div className="w-full h-[25%] bg-slate-950/20 flex justify-center items-center gap-20">
        <Link to='/form'><motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onHover={{ scale: 1.05}}
        >Write a Message</motion.h2></Link>
        <Link to='/users'><motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onHover={{ scale: 1.05}}
        >View Users</motion.h2></Link>
      </div>
    </div>
  )
}
import { motion } from 'motion/react'
import { Link } from 'react-router-dom';



export function BottomPage() {
    return (
        <motion.div className="size-full bg-slate-950/30 flex justify-around items-center snap-start"> 
        <Link to='/users' className="w-[22%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90"><motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>View Users</motion.h2></Link>
        <Link to='/users' className="w-[22%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90"><motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>View Users</motion.h2></Link>
        <Link to='/users' className="w-[22%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90"><motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>View Users</motion.h2></Link>
        </motion.div>
    )
}
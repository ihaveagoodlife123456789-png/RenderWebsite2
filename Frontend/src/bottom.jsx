import { motion } from 'motion/react'
import { Link } from 'react-router-dom';



export function BottomPage() {
    return (
        <motion.div className="size-full bg-slate-950/30 flex justify-around items-center snap-start"> 
        <Link to='/users'><motion.h2 className="w-[27.5%] h-[60%] bg-cyan-800/90 font-semibold text-[24px] text-blue-600/90" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>View Users</motion.h2></Link>
        <Link to='/users'><motion.h2 className="w-[27.5%] h-[60%] bg-cyan-800/90 font-semibold text-[24px] text-blue-600/90" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>View Users</motion.h2></Link>
        <Link to='/users'><motion.h2 className="w-[27.5%] h-[60%] bg-cyan-800/90 font-semibold text-[24px] text-blue-600/90" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>View Users</motion.h2></Link>
        </motion.div>
    )
}
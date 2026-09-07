import { motion } from 'motion/react'
import { Link } from 'react-router-dom';



export function BottomPage() {
    return (
        <motion.div className="size-full bg-slate-950/30 flex justify-around items-center snap-start">
        
        <Link to='/users' className="overflow-hidden w-[20%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90 flex flex-col">

        <motion.h2 className="size-screen flex justify-center items-center bg-[url('/winter-mountain-5120x2880-24311.jpg')] bg-no-repeat bg-cover bg-center">
        <h2 className="font-bold text-[42px] text-amber-600">View users</h2>
        </motion.h2>

        <motion.div className="w-full h-[35%] bg-mist-800/30 relative bottom-0"></motion.div>

        </Link>

        </motion.div>
    )
}
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

export function Dashboard() {
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="relative size-[86%] bg-slate-950/40 flex flex-col justify-center items-center">
            <Link to="/" className="bg-blue-700 py-1 px-2 rounded-[12px] text-[24px] font-semibold absolute bottom-[12%]"><motion.h2 initial={{scale: 1}} whileHover={{scale: 1.06}}>Home</motion.h2></Link>
            </div>
        </div>
    )
}
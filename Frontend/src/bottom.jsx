import { motion } from 'motion/react'
import { Link } from 'react-router-dom';



export function BottomPage() {
    return (
        <motion.div className="size-full bg-slate-950/30 flex justify-around items-center snap-start"> 
        <Link to='/users' className="w-[20%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90 flex flex-col">
        <motion.h2 className="w-full h-[100%] flex justify-center items-center bg-[url('/yosemite-lake-yosemite-valley-landscape-reflection-yosemite-6288x4192-1023.jpg')] bg-no-repeat bg-cover">
        <h2 className="font-bold text-[42px] text-amber-600">View users</h2>
        </motion.h2>
        <motion.div className="w-full h-[35%] bg-mist-800/60 relative bottom-0">
        </motion.div>
        </Link>
        </motion.div>
    )
}
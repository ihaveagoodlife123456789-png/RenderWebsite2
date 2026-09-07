import { motion } from 'motion/react'
import { Link } from 'react-router-dom';



export function BottomPage() {
    return (
        <motion.div className="size-full bg-slate-950/30 flex justify-around items-center snap-start"> 
        <Link to='/users' className="w-[22%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90 flex items-start"><motion.h2 className="w-full h-[78%] flex justify-center items-center bg-[url('/yosemite-lake-yosemite-valley-landscape-reflection-yosemite-6288x4192-1023.jpg')] bg-no-repeat bg-cover"initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}><h2 className="font-bold text-[34px] text-white">View users</h2></motion.h2><motion.div className="w-full h-[22%] bg-slate-950 relative bottom-0"></motion.div></Link>
        <Link to='/users' className="w-[22%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90 flex items-start"><motion.h2 className="w-full h-[78%] flex justify-center items-center bg-[url('/yosemite-lake-yosemite-valley-landscape-reflection-yosemite-6288x4192-1023.jpg')] bg-no-repeat bg-cover"initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}><h2 className="font-bold text-[34px] text-white">View users</h2></motion.h2><motion.div className="w-full h-[22%] bg-slate-950 relative bottom-0"></motion.div></Link>
        <Link to='/users' className="w-[22%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90 flex items-start"><motion.h2 className="w-full h-[78%] flex justify-center items-center bg-[url('/yosemite-lake-yosemite-valley-landscape-reflection-yosemite-6288x4192-1023.jpg')] bg-no-repeat bg-cover"initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}><h2 className="font-bold text-[34px] text-white">View users</h2></motion.h2><motion.div className="w-full h-[22%] bg-slate-950 relative bottom-0"></motion.div></Link>
        </motion.div>
    )
}
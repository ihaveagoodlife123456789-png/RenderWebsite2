import { FrontPage } from "./Front"
import { motion } from 'motion/react'
import { Link } from 'react-router-dom';

export function FullPage() {

    return (
        <div className="h-full w-full overflow-y-scroll scrollbar-none snap-y snap-mandatory">
        <FrontPage />
        <motion.div className="size-full bg-slate-950/30 flex justify-center items-center snap-start" dragMomentum={false}>
        <Link to='/users'><motion.h2 className="font-semibold text-[24px] text-blue-600/90" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.08}}>View Users</motion.h2></Link>
        </motion.div>
        </div>
    )
}
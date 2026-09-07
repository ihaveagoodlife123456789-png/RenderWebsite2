import { motion } from 'motion/react'
import { Link } from 'react-router-dom';



export function BottomPage() {
    return (
        <motion.div className="size-full bg-slate-950/30 flex justify-around items-center snap-start">
        
        <Link to='/users' className="w-[20%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90 flex flex-col">

        <motion.h2 className="w-full h-[65%] flex justify-center items-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf95GKxp-bYuHnEyd_3sSR21oAbE_l0AjFwxKGYQ0EUA&s=10')] bg-no-repeat bg-cover bg-center">
        <h2 className="font-bold text-[42px] text-amber-600">View users</h2>
        </motion.h2>

        <motion.div className="w-full h-[35%] bg-mist-800/30 relative bottom-0 text-white text-[12px] text-center font-bold flex items-center justify-center"><h2 className="h-full w-[70%]">Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.<br /> Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.</h2></motion.div>

        </Link>

        </motion.div>
    )
}

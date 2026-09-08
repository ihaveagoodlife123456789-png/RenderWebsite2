import { motion } from 'motion/react'
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react'
import { services } from './top'


export function BottomPage() {
    const [animate, setAnimate] = useState(false);

    function onMouseEnterAnimation() {
        setAnimate(!animate)
    }

    const variants = {
        Oon: {scale: 1.1},
        Ooff: {scale: 1},
        Hon: {height: 0, opacity: 0},
        Hoof: {height: '35%', opacity: 1},
        Son: {height: '100%', scale: 1.2},
        Soof: {height: '65%', scale: 1},
    }
    return (
        <motion.div id={services} className="size-full bg-slate-950/30 flex justify-around items-center snap-start scroll-smooth"
        >
        
        <Link to='/users' className="overflow-hidden w-[20%] h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90 flex flex-col"
        onMouseEnter={() => onMouseEnterAnimation()}
        onMouseLeave={() => onMouseEnterAnimation()}
        >

        <motion.h2 className="w-full h-[65%] flex justify-center items-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf95GKxp-bYuHnEyd_3sSR21oAbE_l0AjFwxKGYQ0EUA&s=10')] bg-no-repeat bg-cover bg-center"
        variants={variants}
        initial={{scale: 1}}
        transition={{duration: .5}}
        animate={animate ? 'Son' : 'Soof'}
        >
        <motion.h2 className="font-bold text-[42px] text-amber-600"
        variants={variants}
        initial={{opacity: 1}}
        transition={{duration: .5}}
        animate={animate ? 'Oon' : 'Ooff'}
        >View users</motion.h2>
        </motion.h2>

        <motion.div className="w-full h-[35%] bg-mist-800/30 relative bottom-0 text-white text-[12px] text-center font-bold flex flex-col items-center justify-center"
        variants={variants}
        initial={{scale: 1}}
        transition={{duration: .5}}
        animate={animate ? 'Hon' : 'Hoof'}
        >
        <h2 className="font-semibold text-[28px]">Liebestrum</h2>
        <h3 className="w-[70%]"
        variants={variants}
        initial={{opacity: 1}}
        transition={{duration: .2}}
        animate={animate ? 'Oon' : 'Ooff'}
        >Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.<br /> Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.</h3>
        </motion.div>
        </Link>

        </motion.div>
    )
}

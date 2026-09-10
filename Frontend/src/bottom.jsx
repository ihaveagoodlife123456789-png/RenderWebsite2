import { motion } from 'motion/react'
import { Link } from 'react-router-dom';
import { useState } from 'react'


export function BottomPage() {
    const [animate2, setAnimate2] = useState(false);

    function onMouseEnterAnimation2() {
        setAnimate2(!animate2)
    }

    const variants2 = {
        Oon: {scale: 1.06},
        Ooff: {scale: 1},
        Hon: {height: 0, opacity: 0},
        Hoof: {height: '35%', opacity: 1},
        Son: {height: '100%', scale: 1.08},
        Soof: {height: '65%', scale: 1},
    }

    const [animate, setAnimate] = useState(false);

    function onMouseEnterAnimation() {
        setAnimate(!animate)
    }

    const variants = {
        Oon: {scale: 1.14},
        Ooff: {scale: 1},
        Hon: {height: 0, opacity: 0},
        Hoof: {height: '35%', opacity: 1},
        Son: {height: '100%', scale: 1.08},
        Soof: {height: '65%', scale: 1},
    }
    return (
        <motion.div id='explore' className="size-full bg-slate-950/30 flex justify-around items-center snap-start scroll-smooth"
         initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        >
        
        <Link to='/users' className="overflow-hidden sm:w-[52%] md:w-[44%] lg:w-[36%] xl:w-[28%] 2xl:w-[26%] sm:h-[56%] md:h-[54%] lg:h-[52%] xl:h-[50%] 2xl:h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90 flex flex-col"
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
        <h2 className="font-semibold sm:text-[20px] lg:text-[21px] 2xl:text-[22px]">Liebestrum</h2>
        <h3 className="w-[70%] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]"
        variants={variants}
        initial={{opacity: 1}}
        transition={{duration: .2}}
        animate={animate ? 'Oon' : 'Ooff'}
        >Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.<br /> Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.</h3>
        </motion.div>
        </Link>

        <Link to='/profile' className="overflow-hidden sm:w-[52%] md:w-[44%] lg:w-[36%] xl:w-[28%] 2xl:w-[26%] sm:h-[56%] md:h-[54%] lg:h-[52%] xl:h-[50%] 2xl:h-[48%] bg-mist-800/60 font-semibold text-[24px] text-blue-600/90 flex flex-col"
        onMouseEnter={() => onMouseEnterAnimation2()}
        onMouseLeave={() => onMouseEnterAnimation2()}
        >

        <motion.h2 className="w-full h-[65%] flex justify-center items-center bg-[url('https://assets.simpleviewinc.com/sv-anchorage/image/upload/c_fill,f_jpg,g_xy_center,h_450,q_65,w_640,x_2114,y_907/v1/cms_resources/clients/anchorage-redesign/DenaliMtnView_R4409_044d9d90-5361-481b-a074-7dd9918d57be.jpg')] bg-no-repeat bg-cover bg-center"
        variants={variants2}
        initial={{scale: 1}}
        transition={{duration: .5}}
        animate={animate2 ? 'Son' : 'Soof'}
        >
        <motion.h2 className="font-bold text-[42px] text-amber-600"
        variants={variants2}
        initial={{opacity: 1}}
        transition={{duration: .5}}
        animate={animate2 ? 'Oon' : 'Ooff'}
        >Your Profile</motion.h2>
        </motion.h2>

        <motion.div className="w-full h-[35%] bg-mist-800/30 relative bottom-0 text-white text-[12px] text-center font-bold flex flex-col items-center justify-center"
        variants={variants2}
        initial={{scale: 1}}
        transition={{duration: .5}}
        animate={animate2 ? 'Hon' : 'Hoof'}
        >
        <h2 className="font-semibold sm:text-[20px] lg:text-[21px] 2xl:text-[22px]">Zefraum</h2>
        <h3 className="w-[70%] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]"
        variants={variants2}
        initial={{opacity: 1}}
        transition={{duration: .2}}
        animate={animate2 ? 'Oon' : 'Ooff'}
        >Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante <br />tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.</h3>
        </motion.div>
        </Link>

        </motion.div>
    )
}

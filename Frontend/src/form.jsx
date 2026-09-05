import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function FormPage() { 
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center" initial={{scale: 0, y: -20}} animate={{scale: 1, y: 0}} transition={{duration: .1}}>
            <motion.div className="relative h-[90%] w-[45%] bg-slate-950/20 flex flex-col justify-center items-center gap-5" initial={{scale: 0, y: -30}} animate={{scale: 1}} transition={{duration: .3}}>
            <h1 className="text-white font-semibold text-[45px]">Create a Message</h1>
            <p className="w-[55%] wrap-break-word text-slate-300/90 font-semibold text-[14px]">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
            <motion.form  className="flex flex-col align-items justify-content gap-5 font-semibold text-slate-200">
                <h3>Name</h3>
                <input placeholder="Enter your name"></input>
                <h3>Message</h3>
                <input placeholder="Enter your message"></input>
                <h3>Message color</h3>
                <input placeholder="Enter message color"></input>
                <h3>Email</h3>
                <input placeholder="Enter your email"></input>
                <motion.button className="size-fit text-slate-200 bg-blue-800 font-semibold text-[22px] rounded-[15px] py-[6px] px-[10px]" initial={{scale: 0, y: -20}} animate={{scale: 1, y: 0}} transition={{duration: .2}} whileHover={{scale: 1.1}}>Submit</motion.button>
            </motion.form>
                <Link to='/'><motion.div className="text-white text-[16px] border-[2px] border-blue-800 font-semibold absolute top-8 left-8 bg-blue-600/30 size-fit py-[4px] px-[2px] rounded-[6px]" initial={{scale: 0, y: -20}} animate={{scale: 1}} transition={{duration: .1}} whileHover={{scale: 1.06}}>Go home</motion.div></Link>
            </motion.div>
            <img src="/icons8-wreath-64.png" className="size-fit absolute top-14 left-14"/>
        </div>
    )
}
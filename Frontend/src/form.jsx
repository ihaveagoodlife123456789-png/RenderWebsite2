import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function FormPage() { 
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center" initial={{scale: 0, y: -20}} animate={{scale: 1, y: 0}} transition={{duration: .2}} onHover={{scale: 1.4}}>
            <div className="relative h-[90%] w-[45%] bg-slate-950/20 flex flex-col justify-center items-center gap-5">
            <h1 className="text-white font-semibold text-[45px]">Create a Message</h1>
            <p className="text-slate-300/90 font-semibold text-[14px]">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. <br/> Aenean commodo ligula eget dolor. <br/>Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. <br/>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
            <motion.form className="flex flex-col align-items justify-content gap-5 font-semibold text-slate-200" >
                <h3>Name</h3>
                <motion.input placeholder="Enter your name"></motion.input>
                <h3>Message</h3>
                <motion.input placeholder="Enter your message"></motion.input>
                <h3>Message color</h3>
                <motion.input placeholder="Enter message color"></motion.input>
                <h3>Email</h3>
                <motion.input placeholder="Enter your email"></motion.input>
                <motion.button className="size-fit bg-blue-800 text-[22px] rounded-[15px] py-[6px] px-[10px]">Submit</motion.button>
            </motion.form>
                <Link to='/'><motion.div className="text-white absolute top-5 left-5 bg-blue-900/90 size-fit py-[4px] px-[2px] rounded-[10px]" initial={{scale: 0, y: -20}} animate={{scale: 1, y: 0}} transition={{duration: .2}} onHover={{scale: 1.4}}>Go home</motion.div></Link>
            </div>
            <img src="/icons8-wreath-64.png" className="size-fit absolute top-10 left-10"/>
        </div>
    )
}
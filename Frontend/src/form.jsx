import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function FormPage() { 
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="h-[90%] w-[45%] bg-slate-950/20 flex flex-col justify-center items-center gap-5">
            <motion.form className="flex flex-col align-items justify-content gap-5 font-semibold text-slate-200">
                <h3>Name</h3>
                <motion.input placeholder="Enter your name"></motion.input>
                <h3>Message</h3>
                <motion.input placeholder="Enter your message"></motion.input>
                <h3>Message color</h3>
                <motion.input placeholder="Enter message color"></motion.input>
                <h3>Email</h3>
                <motion.input placeholder="Enter your email"></motion.input>
                <motion.button className="size-fit bg-blue-800 rounded-[15px] py-[8px] px-[12px]">Submit</motion.button>
            </motion.form>
                <Link to='/'><motion.div className="text-white">Go home</motion.div></Link>
            </div>
        </div>
    )
}
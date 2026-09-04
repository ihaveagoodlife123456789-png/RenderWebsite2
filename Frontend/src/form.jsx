import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function FormPage() { 
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="h-[90%] w-[45%] bg-slate-950/20 flex flex-col justify-center items-center gap-5">
            <form.motion className="flex flex-col align-items justify-content gap-5 font-semibold text-slate-200">
                <h3>Name</h3>
                <input.motion placeholder="Enter your name"></input.motion>
                <h3>Message</h3>
                <input.motion placeholder="Enter your message"></input.motion>
                <h3>Message color</h3>
                <input.motion placeholder="Enter message color"></input.motion>
                <h3>Email</h3>
                <input.motion placeholder="Enter your email"></input.motion>
                <button.motion>Submit</button.motion>
            </form.motion>
                <Link to='/'>Go Home</Link>
            </div>
        </div>
    )
}
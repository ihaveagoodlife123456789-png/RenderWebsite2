import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, /*SubmitHandler*/ } from "react-hook-form";
import { toast, Toaster } from 'sonner'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})


export function Login() {

const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid, isSubmitSuccessful}
    } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const loginSubmit = async (data) => {

        try {
            const URL = '/api/auth/login'
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const back = await response.json()

            if(!response.ok) {
                throw new Error(back.message || 'Something went wrong')
            }
                console.log(back)
                toast.success('Logged in successfully!')

        } catch (err) {
            setError("root", {
                message: err.message
            })
        }
    }
    
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <Toaster position="top-right" toastOptions={{style: {background: 'green', color: 'white'}}} />
            <div className="relative size-[70%] bg-slate-950/60 flex justify-center items-center flex-col gap-12 text-white font-bold text-[25px]">
                <form onSubmit={handleSubmit(loginSubmit)} className="size-full flex justify-center items-center flex-col">
                    <h2 className="text-white font-bold">Username</h2>
                    <input {...register('username')} type="text" placeholder='username' className="border-[3px] border-slate-950/90"></input>
                    <h2 className="text-white font-bold">Password</h2>
                    <input {...register('password')} type="text" placeholder='password' className="border-[3px] border-slate-950/90"></input>
                    {errors.root && <h4 className="text-red-700">{errors.root.message}</h4>}
                    <motion.button type="submit" className="relative top-4 bg-blue-700/80 size-fit text-white bg-orange-700 py-2 px-3 rounded-[12px]" initial={{scale: 1, color: 'white', backgroundColor: '#F57C00'}} whileHover={{scale: 1.06, color: '#F57C00', backgroundColor: 'white'}} disabled={isSubmitSuccessful || isSubmitting}>{isSubmitSuccessful ? 'Submitted!' : isSubmitting ? 'Submitting...' : 'Submit'}</motion.button>
                </form>
                <a href="https://ascendedhorizons.com/auth/google/google" className="absolute bottom-10">
                <button className="size-fit bg-green-700 py-1 px-2 rounded-[12px]">Login with Google</button>
                </a>
                {isSubmitSuccessful ? <h3 className="aboslute bottom-12 text-green-700 font-bold aboslute bottom-15">Your user session expires in 15 minutes!</h3> : null}
                <Link to="/" className="absolute top-5 left-5 text-green-700 font-bold"><motion.div initial={{scale: 1}} whileHover={{scale: 1.1}}>Home</motion.div></Link>
            </div>
        </div>
    )
}
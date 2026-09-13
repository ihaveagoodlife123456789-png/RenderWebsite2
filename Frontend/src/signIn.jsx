import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, /*SubmitHandler*/ } from "react-hook-form";
import { toast, Toaster } from 'sonner'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email({ message: "Not a valid email"})
})


export function SignIn() {

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
            const URL = '/api/auth/signIn'
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if(!response.ok) {
                throw new Error(result.message || 'Something went wrong')
            }
                console.log(result)
                toast.success('Your message has been submitted!')

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
                    <fieldset disabled={isSubmitSuccessful}>
                    <h2 className="text-white font-bold">Username</h2>
                    <input {...register('username')} type="text" placeholder='username' disabled={isSubmitting} className="border-[3px] border-slate-950/90"></input>
                    <h2 className="text-white font-bold">Password</h2>
                    <input {...register('password')} type="text" placeholder='password' disabled={isSubmitting} className="border-[3px] border-slate-950/90"></input>
                    <h2 className="text-white font-bold">Email</h2>
                    <input {...register('email')} type="text" placeholder='password' disabled={isSubmitting} className="border-[3px] border-slate-950/90"></input>
                    {errors.email ? <h4 className="text-red-700">{errors.email.message}</h4> : null}
                    </fieldset>
                    <motion.button type="submit" className="relative py-1 px-2 top-4 bg-blue-700/80 size-fit text-white rounded-[12px]" disabled={isSubmitting ? true : isSubmitSuccessful ? true : false} initial={{scale: 1}} whileHover={{scale: 1.04}}>{isSubmitSuccessful ? 'Submitted!' : isSubmitting ? 'Submitting...' : 'Submit'}</motion.button>
                    {errors.root ? <h4 className="text-red-700">{errors.root.message}</h4> : null}
                    {isSubmitSuccessful ? <h3 className="text-green-700 font-bold aboslute bottom-15">You can go back home and login!</h3> : null}
                </form>
                <Link to="/"><motion.div className="size-fit border-blue-800 border-[2px] bg-blue-700 font-bold text-[18px] rounded-[12px] absolute top-[4%] left-[4%]" initial={{scale: 1, color: 'white', backgroundColor: '#1D4ED8', borderColor: '#1e40af'}} whileHover={{scale: 1.06, color: '#1D4ED8', backgroundColor: 'white', borderColor: 'none'}}>Home</motion.div></Link>
            </div>
        </div>
    )
}
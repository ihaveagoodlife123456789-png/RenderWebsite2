import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from 'sonner'
import { namedColors } from './namedColors.js'

const formSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name is required").max(15, "Max 15 characters"),
    message: z.string().min(1, "Message is required").max(25, "Max 25 characters"),
    color: z.string(),
    email: z.email({message: "This is not a valid email"})
})

export function FormPage() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid, isSubmitSuccessful}
    } = useForm({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (data) => {
        const [ id, name, message, color, email ] = data
        if(!namedColors.includes(color.toLowerCase())) {
            setError("root", {
                message: "Sorry, this color isn't available at this moment"
            });
            return;
        }
        
        try {
            const URL = '/api/users'
            const response = await fetch(URL, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const fetchedData = await response.json()

            if(!response.ok) {
                const errorMessage = fetchedData.error || 'Internal server error \n 500'
                setError("root", {
                    message: errorMessage
                })
                return;
            }

            toast.success('Your message has been submitted!')
        } catch (err) {
            setError("root", {
                message: "Network error. Please check your connection or try again later."
            })
        }
    }

    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center" initial={{scale: 0, y: -20}} animate={{scale: 1, y: 0}} transition={{duration: .1}}>
            <Toaster position="top-right" toastOptions={{style: {background: 'green', color: 'white'}}} />
            <motion.div className="relative h-[90%] w-[45%] bg-slate-950/20 flex flex-col justify-center items-center gap-5" initial={{scale: 0, y: -30}} animate={{scale: 1}} transition={{duration: .3}}>
            <h1 className="text-white font-semibold text-[45px]">Create a Message</h1>
            <p className="w-[55%] wrap-break-word text-slate-300/90 font-semibold text-[14px]">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
            <motion.form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col align-items justify-content gap-5 font-semibold text-slate-200">
                <fieldset disabled={isSubmitting}>
                <h3>Name</h3>
                <input {...register('name')} disabled={isSubmitSuccessful} type="text" placeholder="Enter your name"></input>
                {errors.name && <h5 className="text-red-700/90">{errors.name.message}</h5>}
                <h3>Message</h3>
                <input {...register('message')} disabled={isSubmitSuccessful} type="text" placeholder="Enter your message"></input>
                {errors.message && <h5 className="text-red-700/90">{errors.message.message}</h5>}
                <h3>Message color</h3>
                <input {...register('color')} disabled={isSubmitSuccessful} type="text" placeholder="Enter message color"></input>
                {errors.color && <h5 className="text-red-700/90">{errors.color.message}</h5>}
                <h3>Email</h3>
                <input {...register('email')} disabled={isSubmitSuccessful} type="text" placeholder="Enter your email"></input>
                {errors.email && <h5 className="text-red-700/90">{errors.email.message}</h5>}
                <input {...register('id')}></input>
                <motion.button disabled={isSubmitSuccessful} className="size-fit text-slate-200 bg-blue-800 font-semibold text-[22px] rounded-[15px] py-[6px] px-[10px]" initial={{scale: 0, y: -20}} animate={{scale: 1, y: 0}} transition={{duration: .2}} whileHover={{scale: 1.1}}>{isSubmitting ? 'Submitting...' : isSubmitSuccessful ? 'Submitted' : 'Submit'}</motion.button>
                {errors.root && <h4 className="text-red-700">errors.root.message</h4>}
                </fieldset>
            </motion.form>
            <h2 className="text-green-400 font-bold text-[35px]">{isValid ? 'Valid!' : isSubmitSuccessful ? 'You can go back to Lobby!' : null}</h2>
            {isSubmitSuccessful ? <Link to='/'><motion.div className="text-white text-[18px] border-[3px] border-blue-800 font-semibold bg-blue-600/30 size-fit py-[6px] px-[4px] rounded-[6px]" initial={{scale: 0, y: -20}} animate={{scale: 1}} transition={{duration: .1}} whileHover={{scale: 1.06}}>Go home</motion.div></Link> : null}
                <Link to='/'><motion.div className="text-white text-[16px] border-[2px] border-blue-800 font-semibold absolute top-8 left-8 bg-blue-600/30 size-fit py-[4px] px-[2px] rounded-[6px]" initial={{scale: 0, y: -20}} animate={{scale: 1}} transition={{duration: .1}} whileHover={{scale: 1.06}}>Go home</motion.div></Link>
            </motion.div>
            <img src="/icons8-wreath-64.png" className="size-fit absolute top-14 left-14"/>
        </div>
    )
}
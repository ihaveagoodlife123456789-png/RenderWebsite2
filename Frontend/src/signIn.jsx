import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, /*SubmitHandler*/ } from "react-hook-form";
import { toast, Toaster } from 'sonner'

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

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
            const URL = '/api/signIn'
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
                toast.success('Your message has been submitted!')

        } catch (err) {
            setError("root", {
                message: err.message
            })
        }
    }

export function Login() {


    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <Toaster position="top-right" toastOptions={{style: {background: 'green', color: 'white'}}} />
            <div className="size-[70%] bg-slate-950/60 flex justify-center items-center">
                <form onSubmit={handleSubmit(loginSubmit)} className="size-full flex justify-center items-center flex-col">
                    <h2 className="text-white font-bold">Username</h2>
                    <input {...register('username')} type="text" placeholder='username' className="border-[3px] border-slate-950/90"></input>
                    <h2 className="text-white font-bold">Password</h2>
                    <input {...register('password')} type="text" placeholder='password' className="border-[3px] border-slate-950/90"></input>
                    {errors.root && <h4 className="text-red-700">{errors.root.message}</h4>}
                    <button type="submit" className="bg-blue-700/80 size-fit text-white">{isSubmitSuccessful ? 'Submitted!' : isSubmitting ? 'Submitting...' : 'Submit'}</button>
                </form>
            </div>
        </div>
    )
}
import { z } from 'zod';
import { toast, Toaster } from 'sonner'
import { useForm, /*SubmitHandler*/ } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    username: z.string(),
    password: z.string()
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
            const URL = '/api/login'
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
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
            console.log(fetchedData.message)
            toast.success('Your message has been submitted!')
        } catch (err) {
            setError("root", {
                message: "Network error. Please check your connection or try again later."
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
                    <input {...register('username')} type="text"></input>
                    <h2 className="text-white font-bold">Password</h2>
                    <input {...register('password')} type="text"></input>
                    <button type="submit" className="bg-blue-700/80 size-fit">Login</button>
                </form>
            </div>
        </div>
    )
}
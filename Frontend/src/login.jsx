import { z } from 'zod';
import { toast, Toaster } from 'sonner'

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

function Login() {
    return (
        <div>
            <Toaster position="top-right" toastOptions={{style: {background: 'green', color: 'white'}}} />
            <div>
                <form onSubmit={handleSubmit(loginSubmit)}>
                    <h2>Username</h2>
                    <input {...register('username')} type="text"></input>
                    <h2>Password</h2>
                    <input {...register('password')} type="text"></input>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
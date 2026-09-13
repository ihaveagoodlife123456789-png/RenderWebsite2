   import { toast } from 'sonner'
   
   export const logout = async () => {

        try {
            const URL = '/api/auth/logout'
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const result = await response.json()
            toast.success(`${result.message}`)
        } catch (err) {
            console.log(err)
        }
    }
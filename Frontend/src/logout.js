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
            if(!response.ok) {
                toast.error(`${result.message}`, { style: { color: 'red' }})
                return
            }
            toast.success(`${result.message}`, { style: { color: 'green' }})
        } catch (err) {
            console.log(err)
        }
    }
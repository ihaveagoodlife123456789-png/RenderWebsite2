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
            const localToken = localStorage.getItem('token')
            const tokenExist = localToken
            if(!response.ok) {
                toast.error(`${result.message}`, { style: { color: 'red' }})
                return
            }
            
            if(tokenExist) {
                localStorage.removeItem('user')
            }
            toast.success(`${result.message}`, { style: { color: 'green' }})
        } catch (err) {
            console.log(err)
        }
    }
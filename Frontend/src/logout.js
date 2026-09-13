   export const logout = async () => {

        try {
            const URL = '/api/auth/logout'
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

        } catch (err) {
            console.log(err)
        }
    }
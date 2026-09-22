import {useState, useEffect} from 'react'

export function PaymentPage() {
const [payment, setPayment] = useState(null)
useEffect(() => {
    async function fetchPayment() {
        const APIResponse = fetch('/auth/stripe', {
            method: 'GET',
            credentials: 'include'
        })

        if(!APIResponse) {
            setPayment(null)
            return;
        }
        const data = APIResponse.json()
        setPayment(data)
        console.log(data)
    }
    fetchPayment()
})
    return (
    <div className="size-full bg-blue-500">
        <div className="size-80% bg-slate-800/80 flex flex-col justify-center items-center">
        hi
        </div>
    </div>
    )
}
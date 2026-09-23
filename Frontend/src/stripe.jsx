import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

export function PaymentPage() {
const [payment, setPayment] = useState(null)

useEffect(() => {
    async function fetchPayment() {
        const APIResponse = await fetch('/auth/stripe', {
            method: 'POST',
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
}, [])
    return (
    <div className="size-full bg-blue-300">
        <div className="size-80% bg-slate-950/80 flex flex-col justify-center items-center">
        {payment ? <div className="text-green-700">Success</div> : <div className="text-red-700">Error</div> }
        </div>
        <Link to="/auth/payment/method" className="font-bold text-white text-[26px]">Pay</Link>
    </div>
    )
}
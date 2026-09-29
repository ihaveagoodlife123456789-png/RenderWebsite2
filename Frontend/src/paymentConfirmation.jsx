import { Link } from 'react-router-dom'

export function PaymentConfirmation() {
    return (
        <div className="size-full bg-slate-400/80 flex items-center justify-center">
            <div className="size-fit">
                Payment Complete!
            </div>
            <Link to="/">Back to Lobby</Link>
        </div>
    )
}
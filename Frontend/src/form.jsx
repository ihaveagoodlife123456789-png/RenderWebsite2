import { Link } from 'react-router-dom';

export function FormPage() { 
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="h-[90%] w-[45%] bg-slate-950/20 flex flex-col justify-center items-center gap-5">
                <h1>Hello, World!</h1>
                <h2>Welcome to the Form Page</h2>
                <Link to='/'>Go Home</Link>
            </div>
        </div>
    )
}
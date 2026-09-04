
import { Link } from 'react-router-dom';

export function FrontPage() {

  return (
    <div className="size-full text-[35px] bg-[url('/christmas-tree-3840x2160-14452.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
      <div className="w-full h-[25%] bg-slate-950/20 flex justify-center items-center gap-5">
        <Link to='/form'>Write a Message</Link>
        <Link to='/users'>View Users</Link>
      </div>
    </div>
  )
}
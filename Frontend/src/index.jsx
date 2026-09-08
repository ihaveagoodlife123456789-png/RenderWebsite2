import { TopPage } from "./top"
import { BottomPage } from "./bottom.jsx"
import { motion } from 'motion/react'
import { Link } from 'react-router-dom';

export function FullPage() {

    return (
        <div className="h-full w-full overflow-y-scroll scrollbar-none snap-y snap-mandatory">
        <TopPage />
        <BottomPage />
        </div>
    )
}
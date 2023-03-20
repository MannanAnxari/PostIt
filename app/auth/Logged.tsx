'use client';

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"


type User = {
    img: string
    name: string
}
export default function Logged({ img, name }: User) {
    return (
        <li className="flex gap-6 items-center">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut()} className="text-sm bg-gray-700 text-white py-2 px-6 rounded-md disabled:opacity-25 hover:bg-gray-600 transition-all active:bg-gray-800"
            >
                Sign Out
            </motion.button>
            <Link href={'/profile'}>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                >
                    <Image src={img} width={44} height={44} alt={name} className='rounded-full' />
                </motion.button>
            </Link>
        </li>
    )
}

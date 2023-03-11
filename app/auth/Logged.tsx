'use client';

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


type User = {
    img: string
    name: string
}
export default function Logged({ img, name }: User) {
    return (
        <li className="flex gap-6 items-center">
            <button onClick={() => signOut()} className="text-sm bg-gray-700 text-white py-2 px-6 rounded-md disabled:opacity-25">
                Sign Out
            </button>
            <Link href={'/profile'}>
                <Image src={img} width={44} height={44} alt={name} className='rounded-full' />
            </Link>
        </li>
    )
}

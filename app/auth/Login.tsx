'use client';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { authOption } from '../../pages/api/auth/[...nextauth]';


export default async function Login() {
    const session = await getServerSession(authOption);

    console.log(session);



    return (

        <li className='list-none'>
            <button onClick={() => signIn()} className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25">
                sign in
            </button>
        </li>

    )
}
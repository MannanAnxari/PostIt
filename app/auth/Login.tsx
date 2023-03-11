'use client';


export default function Login({ data, signIn }) {
  console.log(data);
  return (
    <li className='list-none'>
      <button onClick={() => signIn("google")} className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25">
        sign in
      </button>
    </li>
  )
}
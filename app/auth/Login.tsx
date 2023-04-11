'use client';
import { motion } from "framer-motion"


export default function Login({ data, signIn }) {
  
  return (
    <li className='list-none'>
      <motion.button
        onClick={() => signIn("google")} className="text-sm bg-gray-700 text-white py-2 px-6 rounded-md disabled:opacity-25 hover:bg-gray-600 transition-all active:bg-gray-800"
        whileTap={{ scale: 0.95 }}
      >
        sign in
      </motion.button>
    </li>
  )
}
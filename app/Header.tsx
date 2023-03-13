import Link from "next/link";
import React from "react";
import Login from "./auth/Login";

import { useSession, signIn } from "next-auth/react";
import Logged from "./auth/Logged";

const Header = () => {
  const { data } = useSession();


  return (


    <nav className='flex justify-between items-center py-8'>
      <Link href={'/'}>
        <h1 className='font-bold text-lg'>Send it</h1>
      </Link>
      <ul className='flex items-center gap-6'>

        {data?.user ? (
          <Logged img={data.user?.image || ''} name={data.user?.name || ''} />
        ) : (
          <Login signIn={signIn} data={data} />
        )}
      </ul>
    </nav>
  );
};

export default Header;

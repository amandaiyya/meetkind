import { auth } from '@/app/api/auth/[...nextauth]/options-lite';
import Account from '@/components/Account';
import { getPlans } from '@/lib/getPlans';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const page = 1;

  try {
      const data = await getPlans(page).catch((err) => {
        console.error(err.message);
        return {
          plans: [],
          hasMore: false
        }
      });

      return (
        <Account user={session.user} history={data}/>
      )
  } catch (error) {
      console.error("Server Error: ", error);
      return (
        <Account 
          user={session.user}
          history={{
            plans: [],
            hasMore: false
          }}
        />
      )
  }
};
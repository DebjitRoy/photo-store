import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

function createSupabase() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          const cookieStore = cookies();
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export const supabaseServer = createSupabase();

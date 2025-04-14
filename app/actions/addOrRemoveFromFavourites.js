'use server';

import { createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addOrRemoveFromFavourites(formData) {
  const photoName = formData.get('photoName');
  const isFavourited = formData.get('isFavourited');
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const { error } = await supabase.storage.from('photos').remove([filePath]);
  // console.log({ error });
  if (!user) {
    return { success: false, error: 'user is not authenticated' };
  }
  if (isFavourited === 'true') {
    const { error } = await supabase
      .from('favourites')
      .delete()
      .match({ user_id: user.id, photo_name: photoName });
    if (error) {
      return { success: false, error };
    }
  } else {
    const { error } = await supabase
      .from('favourites')
      .insert([{ user_id: user.id, photo_name: photoName }]);
    if (error) {
      return { success: false, error };
    }
  }

  revalidatePath('/photos');
  revalidatePath('/favourites');
  return { success: true };
}

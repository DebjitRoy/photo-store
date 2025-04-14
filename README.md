This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## My Notes

- Reference - https://www.youtube.com/watch?v=21gOL_PIfAA&t=2467s
- https://github.com/coderyansolomon/photo-store/blob/main
- Add .env.local
- Readup: https://supabase.com/docs/guides/auth/server-side/nextjs

  ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=

  ```

  - supabase stotage policies

        - ### // SELECT

          ```((bucket_id = 'photos'::text) AND (auth.uid() IS NOT NULL) AND (name ~~ (('user_uploads/'::text || auth.uid()) || '/%'::text)))```

    → The ~~ is the PostgreSQL operator for pattern matching (similar to LIKE in SQL).
    It checks if the file name (full path in the bucket) starts with: `user_uploads/<current-user-id>/`

    - ### // INSERT (same as select)

      `((bucket_id = 'photos'::text) AND (auth.uid() IS NOT NULL) AND (name ~~ (('user_uploads/'::text || auth.uid()) || '/%'::text)))`

    - ### // DELETE
      → This policy allows authenticated users to delete files from the photos bucket, but only if the file is in their personal folder (i.e., under user_uploads/<user_id>/...), including subfolders(one folder deep).
      `((bucket_id = 'photos'::text) AND ((name ~~ (('user_uploads/'::text || auth.uid()) || '/%'::text)) OR (name ~~ (('user_uploads/'::text || auth.uid()) || '/%/%'::text))))`

  - supabase db policies for favourites table
  - Create favourites table (id, user_id references auth.users.id, photo name)
  - Add policies for insert/select/delete to the table by only current users matching the user_id in favourites table, so, some users can't delete/see other's favourites

    - `create policy insert_favourites on favourites for insert with check (auth.uid() = user_id);`

    - `create policy select_favourites on favourites for select using (auth.uid() = user_id)`

    - `create policy delete_favourites on favourites for delete using (auth.uid() = user_id)`

- Go to supabase https://supabase.com/dashboard/project/ggbacgzwgxmqxkbwrkyp/settings/api and login using github to access the keys

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

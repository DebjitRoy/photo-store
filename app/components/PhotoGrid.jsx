import { supabaseServer } from '../utils/supabaseServerClient';
import Photo from '@/app/components/Photo';

const fetchUserPhotos = async (user) => {
  if (!user) return;
  const folderPath = `user_uploads/${user.id}/`;
  const { data, error } = await supabaseServer.storage.from('photos').list(folderPath);
  if (error) {
    console.log('error fetching photos', err);
    return;
  }
  return data;
};
// we need to generate the photo url from the photo, as the photos stored are private
const getPhotoUrls = async (photos, user) => {
  return Promise.all(
    photos.map(async (photo) => {
      const { data, error } = await supabaseServer.storage
        .from('photos')
        .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60);

      if (error) {
        console.log('error generating signed url');
        return null;
      }
      return { url: data.signedUrl, photoName: photo.name };
    })
  );
};

async function fetchFavouritePhotos(user) {
  const { data, error } = await supabaseServer
    .from('favourites')
    .select('photo_name')
    .eq('user_id', user.id);

  if (error) {
    console.log('error fetching favourites', error);
    return [];
  }
  return data.map((favourite) => favourite.photo_name);
}
export default async function PhotoGrid({ favourites = false }) {
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  const photos = await fetchUserPhotos(user);

  const photoObjs = await getPhotoUrls(photos, user);
  const favouritePhotoNames = (await fetchFavouritePhotos(user)) || [];

  const photosWithFavourites = photoObjs.map((photoObj) => {
    return {
      ...photoObj,
      isFavourited: favouritePhotoNames.includes(photoObj.photoName),
    };
  });

  const displayedPhotos = favourites
    ? photosWithFavourites.filter((photo) => photo.isFavourited)
    : photosWithFavourites;
  console.log({ favourites, displayedPhotos });
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {displayedPhotos.map((photo) => (
        <Photo
          key={photo.photoName}
          src={photo.url}
          alt={`Photo ${photo.photoName}`}
          width={'200px'}
          height={'200px'}
          photoName={photo.photoName}
          isFavourited={photo.isFavourited}
        />
      ))}
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import PhotoModal from './PhotoModal';
import { deletePhoto } from '../actions/deletePhoto';
import { Delete, Favorite, FavoriteBorder } from '@mui/icons-material';

export default function Photo({ src, alt, width, height, photoName, isFavoutited = false }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <>
      <div
        style={{ width, height }}
        className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
      >
        <form action={deletePhoto} className="absolute bottom-2.5 right-10 z-10">
          <input type="hidden" name="photoPath" value={src} />
          <button
            type="submit"
            className="bg-gray-600 bg-opacity-10 border-none text-white cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300 p-1 rounded-full"
          >
            <Delete />
          </button>
        </form>
        <Image
          src={src}
          alt={alt}
          layout="fill"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          onClick={toggleModal}
        />
      </div>
      {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
    </>
  );
}

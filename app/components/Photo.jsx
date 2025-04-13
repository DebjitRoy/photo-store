'use client';
import React from 'react';
import Image from 'next/image';

export default function Photo({ src, alt, width, height, photoName, isFavoutited = false }) {
  return (
    <div
      style={{ width, height }}
      className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
    </div>
  );
}

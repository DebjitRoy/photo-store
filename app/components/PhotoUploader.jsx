'use client';

import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function PhotoUploader() {
  const [uploading, setUploading] = useState(false);
  const handleFileUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileParts = file.name.split('.');
      const fileExt = fileParts[fileParts.length - 1];
      const fileName = `${Math.floor(Math.random() * 10000000)}.${fileExt}`;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('user not authenticated');
      }
      const filePath = `user_uploads/${user.id}/${fileName}`;
      const { error } = await supabase.storage.from('photos').upload(filePath, file);
      if (error) {
        throw error(error);
      }
      // TODO: Update UI with new photo
    } catch (e) {
      console.log('err upload', e);
    } finally {
      setUploading(false);
    }
  };
  return (
    <label
      htmlFor="photo-upload"
      className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg m-4"
    >
      {uploading ? 'uploading...' : 'upload photo'}
      <input
        type="file"
        id="photo-upload"
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
      />
    </label>
  );
}

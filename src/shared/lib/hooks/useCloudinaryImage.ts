import { useMemo } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import type { CloudinaryImage } from '@cloudinary/url-gen';

const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_API },
});

export function useCloudinaryImage(publicId: string): CloudinaryImage {
    return useMemo(() => cld.image(publicId), [publicId]);
}

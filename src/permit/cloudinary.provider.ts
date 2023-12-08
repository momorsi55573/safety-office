import { ConfigOptions, v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'spices',
      api_key: '264993718755979',
      api_secret: 'jmbOZIE2o3iDj-_TN8SlAFzPh-g',
      crop: 'thumb',
    });
  },
};

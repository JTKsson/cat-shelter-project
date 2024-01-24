
export interface Cats {
  id?: string;
  name: string;
  year: string;
  desc: string;
  image?: {file: File} | {publicUrl: string} | null;
  image_url?: string | null;
}

export interface User {
  email: string;
  password: string;
}
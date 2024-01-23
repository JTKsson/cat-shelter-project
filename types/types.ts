
export interface Cats {
  id?: string | undefined;
  name: string;
  year: string;
  desc: string;
  image?: File | null;
  image_url?: string | null;
}

export interface User {
  email: string;
  password: string;
}
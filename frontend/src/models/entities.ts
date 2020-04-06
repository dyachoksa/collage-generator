export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  last_logged_at?: string;
}

export interface Image {
  name: string;
  url: string;
}

export interface Collage {
  id: number;
  title?: string;
  description?: string;
  status: string;
  image?: Image;
  source_images: Image[];
  created_at: string;
  updated_at: string;
}

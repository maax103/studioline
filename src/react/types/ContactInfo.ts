export interface ContactInfo {
  email: string;
  whatsapp: string;
  instagram?: string;
  address?: string;
  phone?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

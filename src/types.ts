export type VisaType = 'tourist' | 'student' | 'renewal' | 'denial_reversal';

export interface VisaApplication {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  taxId: string; // CPF
  visaType: VisaType;
  passportPhotoUrl?: string;
  idPhotoUrl?: string;
  createdAt: number;
  status: 'pending' | 'reviewed' | 'completed';
  uid: string;
}

export interface Pricing {
  tourist: number;
  student: number;
  renewal: number;
  denial_reversal: number;
}

export const PRICING: Pricing = {
  tourist: 380,
  student: 580,
  renewal: 250,
  denial_reversal: 750, // Estimated price for denial reversal
};

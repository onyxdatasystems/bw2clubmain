// utils/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface Ad {
  id: number;
  title: string;
  description: string;
  image_url: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'inactive' | 'pending';
  price: number;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  type: string;
  location: string;
  established: string;
  website: string;
}

export interface PaymentConfiguration {
  ad_id: number;
  amount: number;
  payment_method: string;
  transaction_id?: string;
}

export const AdService = {
  getAds: async (): Promise<Ad[]> => {
    const response = await fetch(`${BASE_URL}/user/ads`, {
      credentials: 'include'
    });
    return response.json();
  },

  createAd: async (data: FormData): Promise<Ad> => {
    const response = await fetch(`${BASE_URL}/user/ad/store`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    return response.json();
  },

  updateAd: async (id: number, data: FormData): Promise<Ad> => {
    const response = await fetch(`${BASE_URL}/user/ad/update/${id}`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    return response.json();
  },

  deleteAd: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/user/ad/delete/${id}`, {
      method: 'GET',
      credentials: 'include'
    });
  },

  calculateCharge: async (startDate: string, endDate: string): Promise<number> => {
    const response = await fetch(
      `${BASE_URL}/user/ad/ad_charge_by_daterange?start=${startDate}&end=${endDate}`,
      { credentials: 'include' }
    );
    const data = await response.json();
    return data.charge;
  },

  configurePayment: async (id: number, config: PaymentConfiguration): Promise<{ success: boolean }> => {
    const response = await fetch(`${BASE_URL}/user/ad/payment_configuration/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
      credentials: 'include'
    });
    return response.json();
  },

  paymentSuccess: async (identifier: string): Promise<{ success: boolean }> => {
    const response = await fetch(`${BASE_URL}/user/ad/payment_success/${identifier}`, {
      credentials: 'include'
    });
    return response.json();
  }
};
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ApiResponse {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined in environment variables');
}

const API_ENDPOINTS = {
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  RESEND_VERIFICATION: '/resend-verification',
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
};

export const verifyEmail = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VERIFY_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Email verification failed');
  }

  return response.json();
};

export const resendVerification = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.RESEND_VERIFICATION}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to resend verification email');
  }

  return response.json();
};



export const api = {
  fetchProfile: async (): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch {
      return { success: false, error: 'Network error' };
    }
  },

  updateProfile: async (data: { name?: string; email?: string; password?: string }): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/edit_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch {
      return { success: false, error: 'Network error' };
    }
  }
};
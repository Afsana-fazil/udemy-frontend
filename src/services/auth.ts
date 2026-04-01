const TOKEN_KEY = 'jwt_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  // Set cookie for SSR/middleware
  document.cookie = `jwt_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setRefreshToken(token: string) {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  // Remove cookie
  document.cookie = 'jwt_token=; path=/; max-age=0';
}

export async function login(username: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Login failed');
  }
  
  const data = await res.json();
  if (data.status === 'success' && data.data?.token) {
    setToken(data.data.token);
    if (data.data.refresh) {
      setRefreshToken(data.data.refresh);
    }
  }
  return data;
}

export async function register(fullName: string, email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      username: email,
      email: email, 
      full_name: fullName,
      password: password,
      password_confirm: password
    }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  
  const data = await res.json();
  if (data.status === 'success' && data.data?.token) {
    setToken(data.data.token);
    if (data.data.refresh) {
      setRefreshToken(data.data.refresh);
    }
  }
  return data;
}

export function getUserFromToken(token?: string): any {
  try {
    const t = token || getToken();
    if (!t) return null;
    const payload = JSON.parse(atob(t.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

export function logout() {
  removeToken();
} 
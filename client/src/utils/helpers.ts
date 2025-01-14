export function formatCoordinates(obj: any) {
  if (typeof obj !== 'object' || obj === null || !('x' in obj) || !('y' in obj)) {
    return "";
  }
  const { x, y } = obj;
  return `(${x}, ${y})`;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]*$/;
  return usernameRegex.test(username);
}

export async function getIpData() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching IP data:", error);
    throw error;
  }
}
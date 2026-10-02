import type { DurgotsavUser } from "../types/durgotsav";

const TOKEN_KEY = "durgotsav_token";
const USER_KEY = "durgotsav_user";

/**
 * Centralized Session Storage Manager for Durgotsav Authentication
 * Uses browser sessionStorage to isolate Durgotsav session per tab/window.
 */
export const authStorage = {
  getToken(): string | null {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string): void {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.warn("Failed to set Durgotsav session token:", e);
    }
  },

  getUser(): DurgotsavUser | null {
    try {
      const raw = sessionStorage.getItem(USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as DurgotsavUser;
    } catch {
      return null;
    }
  },

  setUser(user: DurgotsavUser): void {
    try {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn("Failed to set Durgotsav session user:", e);
    }
  },

  setSession(token: string, user: DurgotsavUser): void {
    this.setToken(token);
    this.setUser(user);
  },

  clearSession(): void {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    } catch (e) {
      console.warn("Failed to clear Durgotsav session:", e);
    }
  },

  hasSession(): boolean {
    return Boolean(this.getToken() && this.getUser());
  }
};

import type {
  Activity,
  AuthCheckResponse,
  DashboardStats,
  DurgotsavUser,
  LoginResponse,
  Participant,
  RegisterRequest
} from "../types/durgotsav";
import { authStorage } from "./authStorage";

const API_BASE_URL = import.meta.env.VITE_DURGOTSAV_API_BASE_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  statusCode: number;
  errors?: string[];

  constructor(message: string, statusCode: number = 500, errors?: string[]) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * Core HTTP Request Wrapper
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = authStorage.getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        authStorage.clearSession();
      }

      const errorMessage = data?.message || response.statusText || "Something went wrong";
      throw new ApiError(errorMessage, response.status, data?.errors);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network / Offline errors
    throw new ApiError(
      "Unable to connect to Durgotsav server. Please ensure the backend is running.",
      0
    );
  }
}

// ==================== AUTH SERVICES ====================

export async function loginWithPhone(phone: string): Promise<AuthCheckResponse> {
  return apiRequest<AuthCheckResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ phone: phone.trim() })
  });
}

export async function registerUser(data: RegisterRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export async function getAuthProfile(): Promise<{ success: boolean; user: DurgotsavUser }> {
  return apiRequest<{ success: boolean; user: DurgotsavUser }>("/auth/me");
}

// ==================== PUBLIC USER ACTIVITIES ====================

export async function fetchActivities(): Promise<{ success: boolean; count: number; activities: Activity[] }> {
  return apiRequest<{ success: boolean; count: number; activities: Activity[] }>("/activities");
}

export async function fetchActivityById(id: string): Promise<{ success: boolean; activity: Activity }> {
  return apiRequest<{ success: boolean; activity: Activity }>(`/activities/${id}`);
}

export async function fetchActivityParticipants(
  activityId: string,
  search?: string
): Promise<{
  success: boolean;
  count: number;
  participants: Participant[];
}> {
  const query = new URLSearchParams();
  if (search && search.trim()) query.append("search", search.trim());
  const qs = query.toString() ? `?${query.toString()}` : "";
  return apiRequest<{
    success: boolean;
    count: number;
    participants: Participant[];
  }>(`/activities/${activityId}/participants${qs}`);
}

// ==================== PARTICIPANT REGISTRATIONS ====================

export async function registerActivity(
  activityId: string,
  data?:
    | {
        fullName?: string;
        mobile?: string;
        phone?: string;
        tower?: string;
        floor?: string;
        flatNo?: string;
        flatNumber?: string;
        email?: string;
        audioVideoLink?: string;
      }
    | string,
  legacyAudioVideoLink?: string
): Promise<{ success: boolean; message: string; participant: Participant }> {
  let payload: Record<string, any> = { activityId };

  if (typeof data === "string" || data === undefined) {
    payload.email = data ? data.trim() : "";
    payload.audioVideoLink = legacyAudioVideoLink ? legacyAudioVideoLink.trim() : "";
  } else {
    payload = {
      activityId,
      fullName: data.fullName ? data.fullName.trim() : undefined,
      mobile: data.mobile ? data.mobile.trim() : (data.phone ? data.phone.trim() : undefined),
      tower: data.tower ? data.tower.trim() : undefined,
      floor: data.floor ? String(data.floor).trim() : undefined,
      flatNo: data.flatNo ? data.flatNo.trim() : (data.flatNumber ? data.flatNumber.trim() : undefined),
      email: data.email ? data.email.trim() : "",
      audioVideoLink: data.audioVideoLink ? data.audioVideoLink.trim() : ""
    };
  }

  return apiRequest<{ success: boolean; message: string; participant: Participant }>("/participants", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function fetchMyRegistrations(): Promise<{
  success: boolean;
  count: number;
  registrations: Participant[];
}> {
  return apiRequest<{ success: boolean; count: number; registrations: Participant[] }>("/participants/my");
}

export async function withdrawActivityRegistration(
  participantId: string
): Promise<{ success: boolean; message: string; participant: Participant }> {
  return apiRequest<{ success: boolean; message: string; participant: Participant }>(
    `/participants/${participantId}/withdraw`,
    {
      method: "PUT"
    }
  );
}

export async function revokeWithdrawActivityRegistration(
  participantId: string
): Promise<{ success: boolean; message: string; participant: Participant }> {
  return apiRequest<{ success: boolean; message: string; participant: Participant }>(
    `/participants/${participantId}/revoke-withdraw`,
    {
      method: "PUT"
    }
  );
}

export async function updateParticipantRegistration(
  participantId: string,
  data: {
    fullName?: string;
    tower?: string;
    floor?: string;
    flatNo?: string;
    email?: string;
    audioVideoLink?: string;
  }
): Promise<{ success: boolean; message: string; participant: Participant }> {
  return apiRequest<{ success: boolean; message: string; participant: Participant }>(
    `/participants/${participantId}`,
    {
      method: "PUT",
      body: JSON.stringify(data)
    }
  );
}

// ==================== ADMIN SERVICES ====================

export async function fetchAdminDashboard(): Promise<{
  success: boolean;
  message: string;
} & DashboardStats> {
  return apiRequest<{ success: boolean; message: string } & DashboardStats>("/admin/dashboard");
}

export async function fetchAdminActivities(params?: {
  search?: string;
  isActive?: boolean;
  includeDeleted?: boolean;
}): Promise<{ success: boolean; count: number; activities: Activity[] }> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.isActive !== undefined) query.append("isActive", String(params.isActive));
  if (params?.includeDeleted) query.append("includeDeleted", "true");

  const qs = query.toString() ? `?${query.toString()}` : "";
  return apiRequest<{ success: boolean; count: number; activities: Activity[] }>(`/admin/activities${qs}`);
}

export async function createAdminActivity(data: {
  activity: string;
  description?: string;
  venue: string;
  startDateTime: string;
  endDateTime: string;
  audioVideoLink?: string;
}): Promise<{ success: boolean; message: string; activity: Activity }> {
  return apiRequest<{ success: boolean; message: string; activity: Activity }>("/admin/activities", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export async function updateAdminActivity(
  id: string,
  data: Partial<Activity>
): Promise<{ success: boolean; message: string; activity: Activity }> {
  return apiRequest<{ success: boolean; message: string; activity: Activity }>(`/admin/activities/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

export async function deleteAdminActivity(
  id: string
): Promise<{ success: boolean; message: string; activity: Activity }> {
  return apiRequest<{ success: boolean; message: string; activity: Activity }>(`/admin/activities/${id}`, {
    method: "DELETE"
  });
}

export async function fetchAdminParticipants(
  activityId: string,
  params?: { status?: string; search?: string }
): Promise<{
  success: boolean;
  activity: { id: string; name: string; venue: string; startDateTime: string; endDateTime: string };
  totalCount: number;
  participants: Participant[];
}> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== "all") query.append("status", params.status);
  if (params?.search) query.append("search", params.search);

  const qs = query.toString() ? `?${query.toString()}` : "";
  return apiRequest<{
    success: boolean;
    activity: { id: string; name: string; venue: string; startDateTime: string; endDateTime: string };
    totalCount: number;
    participants: Participant[];
  }>(`/admin/activities/${activityId}/participants${qs}`);
}

export async function markParticipantPerformed(
  participantId: string
): Promise<{ success: boolean; message: string; participant: Participant }> {
  return apiRequest<{ success: boolean; message: string; participant: Participant }>(
    `/admin/participants/${participantId}/mark-performed`,
    {
      method: "PUT"
    }
  );
}

export async function markParticipantCertificateCollected(
  participantId: string
): Promise<{ success: boolean; message: string; participant: Participant }> {
  return apiRequest<{ success: boolean; message: string; participant: Participant }>(
    `/admin/participants/${participantId}/mark-certificate-collected`,
    {
      method: "PUT"
    }
  );
}

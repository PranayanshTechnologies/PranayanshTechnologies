export interface DurgotsavUser {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  society?: string;
  tower?: string;
  floor?: string;
  flatNumber?: string;
  isAdmin: boolean;
  createdOn?: string;
  modifiedOn?: string;
}

export interface AuthCheckResponse {
  success: boolean;
  message: string;
  isNewUser: boolean;
  phone?: string;
  token?: string;
  user?: DurgotsavUser;
}

export interface RegisterRequest {
  fullName: string;
  phone: string;
  email?: string;
  society?: string;
  tower?: string;
  floor?: string;
  flatNumber?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  isNewUser: boolean;
  token: string;
  user: DurgotsavUser;
}

export interface Activity {
  _id: string;
  id?: string;
  activity: string;
  description?: string;
  venue: string;
  startDateTime: string;
  endDateTime: string;
  audioVideoLink?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdOn?: string;
  modifiedOn?: string;
}

export interface Participant {
  _id: string;
  id?: string;
  participantNumber?: number;
  activityId: string | Activity;
  activity: string;
  userId: string;
  fullName: string;
  mobile: string;
  email?: string;
  society?: string;
  tower?: string;
  floor?: string;
  flatNo?: string;
  audioVideoLink?: string;
  isWithdraw: boolean;
  isPerformed: boolean;
  isCertificateCollected: boolean;
  performedMarkedBy?: { _id: string; fullName: string; phone: string } | null;
  performedDate?: string | null;
  certificateCollectedDate?: string | null;
  createdDate?: string;
  modifiedDate?: string;
}

export interface ActivityStatItem {
  activityId: string;
  activityName: string;
  venue: string;
  startDateTime: string;
  endDateTime: string;
  isActive: boolean;
  totalRegistered: number;
  activeRegistrations: number;
  performed: number;
  withdrawn: number;
  certificatesCollected: number;
  pendingCertificates: number;
}

export interface DashboardStats {
  totalActivities: number;
  activeActivities: number;
  totalParticipants: number;
  totalPerformed: number;
  totalWithdrawn: number;
  totalCertificatesCollected: number;
  pendingCertificates: number;
  activityStats: ActivityStatItem[];
}

export interface Player {
  id: string;
  name: string;
  ranking: number;
  location: string;
  membershipType: 'Premium' | 'Standard' | 'Junior';
  phone: string;
  email: string;
  profileImage: string;
  joinDate: string;
  matchesPlayed: number;
  winRate: number;
  tennisHeadScore: number;
  tennisHeartScore: number;
  tennisAtheletScore: number;
  fitnessHeartScore: number;
  fitnessHeadScore: number;
  fitnessAthletScore: number;
  evaluated: boolean,
}
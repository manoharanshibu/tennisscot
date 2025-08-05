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
}
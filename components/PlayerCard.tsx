import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Player } from '@/types/Player';

interface PlayerCardProps {
  player: Player;
  onPress?: () => void;
}

export default function PlayerCard({ player, onPress }: PlayerCardProps) {
  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'Premium':
        return '#f59e0b';
      case 'Junior':
        return '#059669';
      default:
        return '#6b7280';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
      <View style={styles.cardHeader}>
        <View style={styles.playerInfo}>
          <View style={styles.nameRankContainer}>
            <Text style={styles.playerName}>{player.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#B30088',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    width: 247,
    height: 54,
  },
  cardHeader: {
    flexDirection: 'row',
    marginTop: 16,
    alignContent: 'center',
    width: 247,
    height: 54,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  playerInfo: {
    flex: 1,
  },
  nameRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FEFEFE',
    flex: 1,
  },
  rankingBadge: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
  },
  membershipBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  membershipText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  winRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  contactContainer: {
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
});
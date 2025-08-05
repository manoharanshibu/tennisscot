import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PlayerCard from '@/components/PlayerCard';
import SearchBar from '@/components/SearchBar';
import { players } from '@/data/players';
import { Player } from '@/types/Player';

export default function PlayersScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) return players;
    
    return players.filter(player =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.membershipType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderPlayer = ({ item }: { item: Player }) => (
    <PlayerCard 
      player={item} 
      onPress={() => {
        // Handle player selection - could navigate to player details
        console.log('Selected player:', item.name);
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#059669', '#047857']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Tennis Scotland</Text>
        <Text style={styles.headerSubtitle}>Player Directory</Text>
      </LinearGradient>

      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, location, or membership..."
        />

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredPlayers.length} {filteredPlayers.length === 1 ? 'player' : 'players'} found
          </Text>
        </View>

        <FlatList
          data={filteredPlayers}
          renderItem={renderPlayer}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#d1fae5',
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 100,
  },
});
import React, { useState, useMemo } from 'react';
import { Image, View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PlayerCard from '@/components/PlayerCard';
import SearchBar from '@/components/SearchBar';
import { players } from '@/data/players';
import { Player } from '@/types/Player';
import PlayerEvaluationModal from '@/components/PlayerEvaluationModel';

export default function PlayersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveEvaluation = (playerId: string, tennisHeadScore: number, fitnessHeadScore: number) => {
    // Here you would typically save the evaluation to your backend or local storage
    console.log('Saving evaluation for player:', playerId, {
      tennisHeadScore,
      fitnessHeadScore,
    });
    // You could also update the player data with the new scores
  };

  const handlePlayerPress = (player: Player) => {
    setSelectedPlayer(player);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPlayer(null);
  };

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
      onPress={() => handlePlayerPress(item)}
    />
  );

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.header}
      >


        <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/images/tennis-scotland-logo.png')}
            style={{ width: 108, height: 45 }} // Set size as needed
            resizeMode="contain"
          />

          {/*  <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name, location, or membership..."
          /> */}
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/search icon.png')}
              style={{ width: 27, height: 27 }} // Set size as needed
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/menu.png')}
              style={{ width: 33, height: 33 }} // Set size as needed
              resizeMode="contain"
            />
          </View>

        </View>
        <Text style={styles.headerTitle}>{formattedDate}</Text>

      </View>

      <View style={styles.content}>


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
      <PlayerEvaluationModal
        visible={modalVisible}
        player={selectedPlayer}
        onClose={handleCloseModal}
        onSave={handleSaveEvaluation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0061a8',
    alignItems: 'center',

  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#0061a8',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 250,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Segoe UI',
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 16,
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
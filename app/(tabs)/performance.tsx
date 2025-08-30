import React, { useState, useMemo, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import PlayerCard from '@/components/PlayerCard';
import { players } from '@/data/players';
import { Player } from '@/types/Player';
import PlayerEvaluationModal from '@/components/PlayerEvaluationModel';
import { EvaluationData, submitPlayerEvaluation } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerformanceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showEvaluationDone, setShowEvaluationDone] = useState(false);
  const [showAllPlayers, setShowAllPlayers] = useState(false);

  const [session, setSession] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        setSession(null);
        const sessionData = await AsyncStorage.getItem('session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          setSession(session);
          console.log('Logged in user:', session.username);
          console.log('Role:', session.role);
        }
      } catch (e) {
        console.error('Failed to load session', e);
      }
    };

    loadSession();
  }, []);

  const handleSaveEvaluation = async (player: Player) => {
    const evaluationData: EvaluationData = {
      'Player-ID': `P${player.id}`,
      'Session-Id': `S${Date.now()}`,
      'Centre_ID': 'SC_3838',
      'Coach_ID': 'C3838',
      'Comments': player?.comment || '',
      'Ft_Athl': player.fitnessAthletScore,
      'Ft_Head': player.fitnessHeadScore,
      'Ft_Heart': player.fitnessHeartScore,
      'Tn_Athl': player.tennisAthletScore,
      'Tn_head': player.tennisHeadScore,
      'Tn_Heart': player.tennisHeartScore,
    };

    console.log('saving', JSON.stringify(evaluationData, null, 2))

    try {
      const success = await submitPlayerEvaluation(evaluationData);
      if (success) {
        setModalVisible(false);
        setShowEvaluationDone(true);
      } else {
        Alert.alert('Error', 'Failed to submit evaluation.');
      }
    } catch (error) {
      console.error('Evaluation submission failed:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
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
      player.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const displayedPlayers = useMemo(() => {
    const playersToShow = searchQuery.trim() ? filteredPlayers : players;
    return showAllPlayers ? playersToShow : playersToShow.slice(0, 4);
  }, [filteredPlayers, showAllPlayers, searchQuery]);

  const hasMorePlayers = useMemo(() => {
    const totalPlayers = searchQuery.trim() ? filteredPlayers.length : players.length;
    return totalPlayers > 4;
  }, [filteredPlayers.length, showAllPlayers, searchQuery]);

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
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/images/tennis-scotland-logo.png')}
            style={{ width: 140, height: 60 }}
            resizeMode="contain"
          />
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/search icon.png')}
              style={{ width: 27, height: 27 }}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/menu.png')}
              style={{ width: 33, height: 33 }}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.headerTitle}>{formattedDate}</Text>
        <View style={styles.locationIconContainer}>
          <Image
            source={require('../../assets/images/locationIcon.png')}
            style={{ width: 22, height: 26, marginTop: -5 }}
            resizeMode="contain"
          />
          <Text style={styles.locationTitle}>Ladywell Community Tennis Courts</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {displayedPlayers.length} {displayedPlayers.length === 1 ? 'player' : 'players'} {showAllPlayers || searchQuery.trim() ? 'found' : 'shown'}
          </Text>
        </View>

        <FlatList
          data={displayedPlayers}
          renderItem={renderPlayer}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />

        {hasMorePlayers && (
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => setShowAllPlayers(!showAllPlayers)}
            activeOpacity={0.7}
          >
            <Text style={styles.moreText}>{showAllPlayers ? 'Show Less' : 'More Players'}</Text>
            <Image
              source={require('../../assets/images/more.png')}
              style={[
                styles.moreIcon,
                {
                  transform: [{ rotate: showAllPlayers ? '180deg' : '0deg' }],
                },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Evaluation Modal */}
      <PlayerEvaluationModal
        visible={modalVisible}
        player={selectedPlayer}
        session={session}
        onClose={handleCloseModal}
        onSave={handleSaveEvaluation}
      />

      {/* Evaluation Done Modal */}
      <Modal transparent visible={showEvaluationDone} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={[styles.modalItem, { color: '#059669', fontWeight: '600' }]}>
              Thank you for submitting the evaluation!
            </Text>
            <TouchableOpacity
              onPress={() => setShowEvaluationDone(false)}
              style={[styles.confirmBtn, { marginTop: 12 }]}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#0061a8',
  },
  locationIconContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    minWidth: 300,
    justifyContent: 'space-between',
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 16,
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  resultsHeader: {
    paddingHorizontal: 16,
  },
  resultsText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 10,
    marginTop: -10,
    marginLeft: 150,
  },
  moreIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#ffffff',
  },
  moreText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  modalItem: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center',
  },
  confirmBtn: {
    backgroundColor: '#0061a8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

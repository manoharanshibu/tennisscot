import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Player } from '@/types/Player';
import ScoreSelector from './ScoreSelector';
import { ROLE_TYPES, RoleType } from '@/app/(tabs)/constants';
import { Session } from '@/types/Session';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PlayerEvaluationModalProps {
  visible: boolean;
  player: Player | null;
  session: Session | null | undefined;
  onClose: () => void;
  onSave: (player: Player) => void;
}

export default function PlayerEvaluationModal({
  visible,
  player,
  session,
  onClose,
  onSave,
}: PlayerEvaluationModalProps) {
  const [tennisHeadScore, setTennisHeadScore] = useState(5);
  const [tennisHeartScore, setTennisHeartScore] = useState(5);
  const [tennisAthletScore, setTennisAthletScore] = useState(5);
  const [fitnessHeadScore, setFitnessHeadScore] = useState(5);
  const [fitnessHeartScore, setFitnessHeartScore] = useState(5);
  const [fitnessAthletScore, setFitnessAthletScore] = useState(5);

  const [roleType, setRoleType] = useState<RoleType>(session?.role);

  useEffect(() => {
    const loadSession = async () => {
      try {
        setRoleType(null);
        const sessionData = await AsyncStorage.getItem('session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          setRoleType(session.role);
          console.log('Logged in user:', session.username);
          console.log('Role:', session.role);
        }
      } catch (e) {
        console.error('Failed to load session', e);
      }
    };

    loadSession();
  }, [visible, session]);

  const handleSave = () => {
    if (player) {
      onSave({
        ...player,
        tennisHeadScore,
        tennisHeartScore,
        tennisAthletScore,
        fitnessHeadScore,
        fitnessHeartScore,
        fitnessAthletScore,
      });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!player) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.playerSection}>
            <View style={styles.playerInfo}>
              <Image source={{ uri: player.profileImage }} style={styles.profileImage} />
              <View style={styles.nameRankContainer}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.locationText}>{player.location}</Text>
              </View>
              <Image source={require('../assets/images/country.png')}
                style={styles.countryImage} />
            </View>
          </View>

          <View style={styles.evaluationSection}>
            <Text style={styles.sectionTitle}>10 Mar 2025</Text>
            <Text style={styles.sectionTitle}>Ladywell Community Tennis Courts</Text>

            <View style={styles.headingContainer}>

              <Text style={styles.heading}></Text>

              {(roleType === ROLE_TYPES.TENNIS || roleType === ROLE_TYPES.TENNISFITNESS) && <Text style={styles.heading}>Tennis</Text>}

              {(roleType === ROLE_TYPES.FITNESS || roleType === ROLE_TYPES.TENNISFITNESS) && <Text style={styles.heading}>Fitness</Text>}
            </View>

            <View style={styles.scoreSection}>
              <View style={styles.scoreLabelContainer}>
                <Text style={styles.scoreLabel}>Head</Text>
              </View>
              {(roleType === ROLE_TYPES.TENNIS || roleType === ROLE_TYPES.TENNISFITNESS) && <ScoreSelector value={tennisHeadScore} onChange={setTennisHeadScore} />}

              {(roleType === ROLE_TYPES.FITNESS || roleType === ROLE_TYPES.TENNISFITNESS) && <ScoreSelector value={fitnessHeadScore} onChange={setFitnessHeadScore} />}

            </View>

            <View style={styles.scoreSection}>
              <View style={styles.scoreLabelContainer}>
                <Text style={styles.scoreLabel}>Heart</Text>
              </View>
              {(roleType === ROLE_TYPES.TENNIS || roleType === ROLE_TYPES.TENNISFITNESS) && <ScoreSelector value={tennisHeartScore} onChange={setTennisHeartScore} />}

              {(roleType === ROLE_TYPES.FITNESS || roleType === ROLE_TYPES.TENNISFITNESS) && <ScoreSelector value={fitnessHeartScore} onChange={setFitnessHeartScore} />}

            </View>

            <View style={styles.scoreSection}>
              <View style={styles.scoreLabelContainer}>
                <Text style={styles.scoreLabel}>Athlet</Text>
              </View>
              {(roleType === ROLE_TYPES.TENNIS || roleType === ROLE_TYPES.TENNISFITNESS) && <ScoreSelector value={tennisAthletScore} onChange={setTennisAthletScore} />}

              {(roleType === ROLE_TYPES.FITNESS || roleType === ROLE_TYPES.TENNISFITNESS) && <ScoreSelector value={fitnessAthletScore} onChange={setFitnessAthletScore} />}
            </View>

            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Your feedback here..."
            />

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0061a8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  playerSection: {
    alignContent: 'center',
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: -15,
    marginBottom: 10,
  },
  countryImage: {
    width: 30,
    height: 30,
    marginTop: -15,
  },
  playerInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
  },
  nameRankContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-start',

  },
  playerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FEFEFE',
    alignItems: 'flex-start',
    marginTop: 12,
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
  locationText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '400',

    marginBottom: 12,
  },
  membershipBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  membershipText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  statsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  heading: {
    color: '#FD5DF1',
    fontSize: 21,
    fontWeight: '600',
    width: 90,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ffffff',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  evaluationSection: {
    backgroundColor: '#0061a8',
    borderRadius: 16,
    padding: 40,
    marginTop: 16,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    boxShadow: '1px 1px 15px 0px #00000040',

  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  scoreLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: 85,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  scoreDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,

  },
  textArea: {
    height: 120,
    width: 300,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',   // Ensures text starts from the top
    borderRadius: 8,
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  saveButton: {
    paddingVertical: 10,
    borderRadius: 12,
    width: 54,
    height: 40,
    backgroundColor: '#FD5DF1',
    alignItems: 'center',
    maxWidth: 80,

  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});
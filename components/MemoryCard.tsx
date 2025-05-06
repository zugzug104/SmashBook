import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Themed';

type MemoryType = 'photo' | 'note' | 'voice' | 'text' | 'instagram' | 'tiktok' | 'location' | 'link';

interface MemoryCardProps {
  type: MemoryType;
  content: string;
  timestamp: string;
  onPress?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width / 2) - 12;

export default function MemoryCard({ 
  type, 
  content, 
  timestamp, 
  onPress, 
  onShare, 
  onFavorite 
}: MemoryCardProps) {
  const renderContent = () => {
    switch (type) {
      case 'photo':
        return (
          <Image 
            source={{ uri: content }} 
            style={styles.image}
            resizeMode="cover"
          />
        );
      case 'note':
        return (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText} numberOfLines={3}>{content}</Text>
          </View>
        );
      case 'voice':
        return (
          <View style={styles.voiceContainer}>
            <Ionicons name="mic" size={24} color="#666" />
            <Text style={styles.voiceText}>Voice Memo</Text>
          </View>
        );
      case 'location':
        return (
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={24} color="#666" />
            <Text style={styles.locationText}>{content}</Text>
          </View>
        );
      default:
        return (
          <View style={styles.defaultContainer}>
            <Ionicons name="link" size={24} color="#666" />
            <Text style={styles.defaultText}>{content}</Text>
          </View>
        );
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {renderContent()}
      <View style={styles.footer}>
        <Text style={styles.timestamp}>{timestamp}</Text>
        <View style={styles.actions}>
          <TouchableOpacity 
            onPress={onShare} 
            style={styles.actionButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="share-outline" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onFavorite} 
            style={styles.actionButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="heart-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: '#f0f0f0',
  },
  noteContainer: {
    padding: 16,
    minHeight: 120,
    backgroundColor: '#f8f8f8',
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  voiceContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    backgroundColor: '#f8f8f8',
  },
  voiceText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    backgroundColor: '#f8f8f8',
  },
  locationText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  defaultContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    backgroundColor: '#f8f8f8',
  },
  defaultText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 12,
    padding: 4,
  },
}); 
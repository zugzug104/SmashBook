import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../components/Themed';
import MemoryCard from '../components/MemoryCard';
import ZoomableGrid from '../components/ZoomableGrid';
import ExpandingSearchBar from '../components/ExpandingSearchBar';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const COLUMN_WIDTH = width / COLUMN_COUNT;

// Sample data for demonstration
const sampleMemories = [
  {
    id: '1',
    type: 'photo',
    content: 'https://picsum.photos/400/400',
    timestamp: '2:30 PM',
  },
  {
    id: '2',
    type: 'note',
    content: 'Remember to call mom about the weekend plans. She mentioned something about a family dinner.',
    timestamp: '1:45 PM',
  },
  {
    id: '3',
    type: 'location',
    content: 'Central Park, New York',
    timestamp: '11:20 AM',
  },
  {
    id: '4',
    type: 'voice',
    content: 'Voice memo recording',
    timestamp: '10:15 AM',
  },
  {
    id: '5',
    type: 'link',
    content: 'https://example.com/interesting-article',
    timestamp: '9:30 AM',
  },
];

export default function HomeScreen() {
  const [currentScale, setCurrentScale] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(sampleMemories);

  const handleShare = (id: string) => {
    console.log('Share memory:', id);
  };

  const handleFavorite = (id: string) => {
    console.log('Favorite memory:', id);
  };

  const handlePress = (id: string) => {
    console.log('Open memory:', id);
  };

  const handleZoomChange = (scale: number) => {
    setCurrentScale(scale);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(sampleMemories);
      return;
    }
    
    const filtered = sampleMemories.filter(memory => {
      const content = memory.content.toLowerCase();
      const type = memory.type.toLowerCase();
      return content.includes(query.toLowerCase()) || type.includes(query.toLowerCase());
    });
    
    setSearchResults(filtered);
  };

  const handleSearchClose = () => {
    setIsSearching(false);
    setSearchResults(sampleMemories);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Today</Text>
          <Text style={styles.dateRange}>May 6, 2024</Text>
        </View>
        
        <View style={styles.actions}>
          <ExpandingSearchBar
            onSearch={handleSearch}
            onClose={handleSearchClose}
          />
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ZoomableGrid onZoomChange={handleZoomChange}>
        <ScrollView style={styles.content}>
          <View style={styles.grid}>
            {searchResults.map((memory) => (
              <MemoryCard
                key={memory.id}
                type={memory.type as any}
                content={memory.content}
                timestamp={memory.timestamp}
                onPress={() => handlePress(memory.id)}
                onShare={() => handleShare(memory.id)}
                onFavorite={() => handleFavorite(memory.id)}
              />
            ))}
          </View>
        </ScrollView>
      </ZoomableGrid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    flexDirection: 'column',
  },
  date: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 16,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
}); 
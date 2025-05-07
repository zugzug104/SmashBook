import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Themed';

const { width } = Dimensions.get('window');

interface ExpandingSearchBarProps {
  onSearch: (query: string) => void;
  onClose: () => void;
}

export default function ExpandingSearchBar({ onSearch, onClose }: ExpandingSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const expandAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const handleExpand = () => {
    setIsExpanded(true);
    Animated.spring(expandAnim, {
      toValue: 1,
      useNativeDriver: false,
      tension: 65,
      friction: 11,
    }).start(() => {
      inputRef.current?.focus();
    });
  };

  const handleCollapse = () => {
    Keyboard.dismiss();
    Animated.spring(expandAnim, {
      toValue: 0,
      useNativeDriver: false,
      tension: 65,
      friction: 11,
    }).start(() => {
      setIsExpanded(false);
      setSearchQuery('');
      onClose();
    });
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      {!isExpanded ? (
        <TouchableOpacity onPress={handleExpand} style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <Animated.View
          style={[
            styles.expandedContainer,
            {
              width: expandAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [40, width - 32],
              }),
              opacity: expandAnim,
            },
          ]}
        >
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Search memories..."
              value={searchQuery}
              onChangeText={handleSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleCollapse} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
  },
  searchButton: {
    padding: 8,
    marginRight: 8,
  },
  expandedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
}); 
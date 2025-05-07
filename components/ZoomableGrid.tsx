import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  PanResponder,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import { Text } from './Themed';

const { width, height } = Dimensions.get('window');
const MIN_SCALE = 1;
const MAX_SCALE = 3;

interface ZoomableGridProps {
  children: React.ReactNode;
  onZoomChange?: (scale: number) => void;
}

export default function ZoomableGrid({ children, onZoomChange }: ZoomableGridProps) {
  const [scale] = useState(new Animated.Value(1));
  const [currentScale, setCurrentScale] = useState(1);
  const lastScale = useRef(1);
  const lastGestureDistance = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        lastScale.current = currentScale;
      },
      onPanResponderMove: (event: GestureResponderEvent, gestureState: any) => {
        if (event.nativeEvent.touches.length === 2) {
          const touch1 = event.nativeEvent.touches[0];
          const touch2 = event.nativeEvent.touches[1];
          const distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2)
          );

          if (lastGestureDistance.current === 0) {
            lastGestureDistance.current = distance;
            return;
          }

          const newScale = (distance / lastGestureDistance.current) * lastScale.current;
          const boundedScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);

          scale.setValue(boundedScale);
          setCurrentScale(boundedScale);
          onZoomChange?.(boundedScale);

          lastGestureDistance.current = distance;
        }
      },
      onPanResponderRelease: () => {
        lastGestureDistance.current = 0;
      },
    })
  ).current;

  const getTimeRange = (scale: number) => {
    if (scale >= 2.5) return 'Day';
    if (scale >= 1.5) return 'Week';
    if (scale >= 1) return 'Month';
    return 'Year';
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeRangeContainer}>
        <Text style={styles.timeRangeText}>
          {getTimeRange(currentScale)}
        </Text>
      </View>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  timeRangeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timeRangeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
}); 
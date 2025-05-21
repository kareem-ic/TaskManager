import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Task({ text, description, completed }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={[styles.square, completed && styles.completedSquare]} />

        <View style={styles.textContainer}>
          {/* --- Task title --- */}
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, completed && styles.titleDone]}
          >
            {text}
          </Text>

          {/* --- Optional description --- */}
          {!!description && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.description, completed && styles.descriptionDone]}
            >
              {description}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#222324',  // or make transparent if you prefer
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  completedSquare: {
    backgroundColor: '#28a745',
    opacity: 0.6,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  description: {
    fontSize: 12,
    color: '#A1A1A1',
    marginTop: 2,
  },
  descriptionDone: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
});

import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Task from './Task';

const COLORS = {
  background: '#1E1E1E',
  card: '#2C2C2E',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1A1',
  accent: '#4E9F3D',
  danger: '#FF6B6B',
};

export default function App() {
  /* ---------- state ---------- */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'
  const descInputRef = useRef(null);

  /* ---------- helpers ---------- */
  const addTask = () => {
    const cleanTitle = title.replace(/\s+/g, ' ').trim();
    const cleanDesc  = description.replace(/\s+/g, ' ').trim();
    if (!cleanTitle) return;
    Keyboard.dismiss();
    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), title: cleanTitle, description: cleanDesc, completed: false },
    ]);
    setTitle('');
    setDescription('');
  };

  const toggleComplete = id =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = id =>
    setTasks(prev => prev.filter(t => t.id !== id));

  /* ---------- filter selector ---------- */
  const visibleTasks = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  );

  /* ---------- renderers ---------- */
  const renderTask = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => toggleComplete(item.id)}
        style={{ flex: 1 }}
      >
        <Task text={item.title} description={item.description} completed={item.completed} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Ionicons name="trash-outline" size={24} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  /* ---------- UI ---------- */
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Manager</Text>
        <Text style={styles.headerSubtitle}>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </Text>
      </View>

      {/* filter tabs */}
      <View style={styles.tabs}>
        {['all', 'active', 'done'].map(key => (
          <TouchableOpacity
            key={key}
            onPress={() => setFilter(key)}
            style={[styles.tab, filter === key && styles.tabActive]}
          >
            <Text style={styles.tabText}>
              {key[0].toUpperCase() + key.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* list */}
      <FlatList
        data={visibleTasks}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nothing to do yet — add a task below.</Text>
        }
        showsVerticalScrollIndicator={false}
      />

      {/* input & FAB */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputArea}
      >
        <TextInput
          placeholder="Task title"
          placeholderTextColor={COLORS.textSecondary}
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
          multiline={false}
          blurOnSubmit={false}
          onSubmitEditing={() => descInputRef.current?.focus()}
        />
        <TextInput
          ref={descInputRef}
          placeholder="Description (optional)"
          placeholderTextColor={COLORS.textSecondary}
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          returnKeyType="done"
          multiline={false}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.fab} onPress={addTask}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 32, fontWeight: '700', color: COLORS.textPrimary },
  headerSubtitle: { marginTop: 4, fontSize: 16, color: COLORS.textSecondary },

  /* tabs */
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  tabActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
  },

  listContent: { paddingHorizontal: 16, paddingBottom: 120 },
  emptyText:   { textAlign: 'center', color: COLORS.textSecondary, marginTop: 40 },

  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },

  inputArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    backgroundColor: COLORS.background,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: Platform.OS === 'ios' ? 48 : 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});

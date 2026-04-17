import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { Button } from '../../components/ui/Button';

const DATES = [
  { day: 'Mon', date: '20' },
  { day: 'Tue', date: '21' },
  { day: 'Wed', date: '22' },
  { day: 'Thu', date: '23' },
  { day: 'Fri', date: '24' },
];

const TIMES = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export default function BookingModal() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  const [selectedDate, setSelectedDate] = useState('20');
  const [selectedTime, setSelectedTime] = useState('14:00');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Select Time</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CalendarIcon size={18} color={theme.gold} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>May 2024</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateList}>
            {DATES.map((d) => (
              <TouchableOpacity
                key={d.date}
                onPress={() => setSelectedDate(d.date)}
                style={[
                  styles.dateCard,
                  { backgroundColor: theme.card },
                  selectedDate === d.date && { backgroundColor: theme.gold }
                ]}
              >
                <Text style={[styles.dayText, { color: selectedDate === d.date ? '#000' : theme.textSecondary }]}>{d.day}</Text>
                <Text style={[styles.dateText, { color: selectedDate === d.date ? '#000' : theme.text }]}>{d.date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={18} color={theme.gold} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Available Times</Text>
          </View>
          
          <View style={styles.timeGrid}>
            {TIMES.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setSelectedTime(t)}
                style={[
                  styles.timeCard,
                  { backgroundColor: theme.card },
                  selectedTime === t && { backgroundColor: theme.gold }
                ]}
              >
                <Text style={[styles.timeText, { color: selectedTime === t ? '#000' : theme.text }]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.card }]}>
        <Button 
          label="Confirm Booking" 
          variant="gold" 
          onPress={() => {
            alert('Booking Successful!');
            router.replace('/(client)');
          }}
          style={{ width: '100%' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  dateList: {
    flexDirection: 'row',
  },
  dateCard: {
    width: 60,
    height: 80,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '800',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeCard: {
    width: '30%',
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
});

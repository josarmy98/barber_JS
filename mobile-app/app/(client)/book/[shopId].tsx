import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2
} from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MOCK_SHOPS, MOCK_BARBERS } from '@/services/mock-data';
import { Service, BarberProfile } from '@/types/index';

const { width } = Dimensions.get('window');

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
  '16:00', '16:30', '17:00'
];

export default function BookingScreen() {
  const { shopId } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const shop = MOCK_SHOPS.find((shop: any) => shop.id === shopId);
  const barbers = MOCK_BARBERS.filter((barber: any) => shop?.barbers.includes(barber.id));

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<BarberProfile | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const canGoNext = useMemo(() => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedBarber;
    if (step === 3) return !!selectedDate && !!selectedTime;
    return false;
  }, [step, selectedService, selectedBarber, selectedDate, selectedTime]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Mock Finalize Booking
      Alert.alert(
        "Booking Confirmed!",
        `Your appointment at ${shop?.name} is set for ${selectedDate} at ${selectedTime}.`,
        [{ text: "Great!", onPress: () => router.push('/(client)/bookings') }]
      );
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepContainer}>
      {[1, 2, 3].map((s) => (
        <View key={s} style={styles.stepItem}>
          <View style={[
            styles.stepCircle, 
            { backgroundColor: step >= s ? theme.gold : theme.card }
          ]}>
            <Text style={[styles.stepNumber, { color: step >= s ? '#000' : theme.textSecondary }]}>
              {s}
            </Text>
          </View>
          {s < 3 && <View style={[styles.stepLine, { backgroundColor: step > s ? theme.gold : theme.border }]} />}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Book Appointment</Text>
        <View style={{ width: 40 }} />
      </View>

      {renderStepIndicator()}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Choose a Service</Text>
            {shop?.services.map((service: any) => (
              <TouchableOpacity 
                key={service.id}
                onPress={() => setSelectedService(service)}
                style={[
                  styles.optionCard, 
                  { backgroundColor: theme.card },
                  selectedService?.id === service.id && { borderColor: theme.gold, borderWidth: 2 }
                ]}
              >
                <View style={styles.optionInfo}>
                  <Text style={[styles.optionName, { color: theme.text }]}>{service.name}</Text>
                  <Text style={[styles.optionMeta, { color: theme.textSecondary }]}>
                    {service.durationMinutes} min • ${service.price}
                  </Text>
                </View>
                {selectedService?.id === service.id && <CheckCircle2 size={24} color={theme.gold} />}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 2: Barber Selection */}
        {step === 2 && (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Choose a Barber</Text>
            {/* Any Available Option */}
            <TouchableOpacity 
              onPress={() => setSelectedBarber({ id: 'any', fullName: 'Any Barber' } as any)}
              style={[
                styles.optionCard, 
                { backgroundColor: theme.card },
                selectedBarber?.id === 'any' && { borderColor: theme.gold, borderWidth: 2 }
              ]}
            >
              <View style={[styles.avatarPlaceholder, { backgroundColor: theme.gold }]}>
                <User size={24} color="#000" />
              </View>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionName, { color: theme.text }]}>Any Available Barber</Text>
                <Text style={[styles.optionMeta, { color: theme.textSecondary }]}>Fastest availability</Text>
              </View>
              {selectedBarber?.id === 'any' && <CheckCircle2 size={24} color={theme.gold} />}
            </TouchableOpacity>

            {barbers.map((barber: any) => (
              <TouchableOpacity 
                key={barber.id}
                onPress={() => setSelectedBarber(barber)}
                style={[
                  styles.optionCard, 
                  { backgroundColor: theme.card },
                  selectedBarber?.id === barber.id && { borderColor: theme.gold, borderWidth: 2 }
                ]}
              >
                <View style={styles.barberAvatarBox}>
                   {/* In a real app, use Image here */}
                   <View style={[styles.avatarPlaceholder, { backgroundColor: theme.border }]}>
                      <Text style={{ color: theme.text }}>{barber.fullName[0]}</Text>
                   </View>
                </View>
                <View style={styles.optionInfo}>
                  <Text style={[styles.optionName, { color: theme.text }]}>{barber.fullName}</Text>
                  <Text style={[styles.optionMeta, { color: theme.textSecondary }]}>
                    {barber.rating} ★ • {barber.specialties[0]}
                  </Text>
                </View>
                {selectedBarber?.id === barber.id && <CheckCircle2 size={24} color={theme.gold} />}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 3: Date & Time Selection */}
        {step === 3 && (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Select Date & Time</Text>
            
            <View style={styles.calendarStrip}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {DAYS.map((day, i) => (
                  <TouchableOpacity 
                    key={i}
                    onPress={() => setSelectedDate(`May ${20 + i}`)}
                    style={[
                      styles.dateCard, 
                      { backgroundColor: theme.card },
                      selectedDate === `May ${20 + i}` && { backgroundColor: theme.gold }
                    ]}
                  >
                    <Text style={[styles.dateDay, { color: selectedDate === `May ${20 + i}` ? '#000' : theme.textSecondary }]}>
                      {day}
                    </Text>
                    <Text style={[styles.dateNumber, { color: selectedDate === `May ${20 + i}` ? '#000' : theme.text }]}>
                      {20 + i}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text style={[styles.subSectionTitle, { color: theme.text }]}>Available Slots</Text>
            <View style={styles.timeGrid}>
               {TIME_SLOTS.map((time) => (
                 <TouchableOpacity 
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  style={[
                    styles.timeSlot, 
                    { backgroundColor: theme.card },
                    selectedTime === time && { backgroundColor: theme.gold }
                  ]}
                 >
                   <Text style={[styles.timeText, { color: selectedTime === time ? '#000' : theme.text }]}>
                    {time}
                   </Text>
                 </TouchableOpacity>
               ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer CTA */}
      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <TouchableOpacity 
          style={[styles.nextButton, { backgroundColor: canGoNext ? theme.gold : theme.border }]}
          disabled={!canGoNext}
          onPress={handleNext}
        >
          <Text style={[styles.nextButtonText, { color: canGoNext ? '#000' : theme.textSecondary }]}>
            {step === 3 ? 'Confirm Booking' : 'Continue'}
          </Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 4,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: Spacing.lg,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  optionMeta: {
    fontSize: 14,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  barberAvatarBox: {
    marginRight: Spacing.md,
  },
  calendarStrip: {
    marginBottom: Spacing.xl,
  },
  dateCard: {
    width: 60,
    height: 80,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dateDay: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 40,
  },
  timeSlot: {
    width: (width - 32 - 24) / 3,
    height: 44,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    padding: Spacing.md,
    borderTopWidth: 1,
  },
  nextButton: {
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

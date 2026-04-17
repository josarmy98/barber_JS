import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Alert,
  Dimensions,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Info, CheckCircle2, Clock, DollarSign } from 'lucide-react-native';

const { width } = Dimensions.get('window');
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { MOCK_SHOPS, MOCK_BARBERS } from '../../services/mock-data';
import { Button } from '../../components/ui/Button';
import { useShopStore } from '../../store/useShopStore';

export default function BookingScreen() {
  const { shopId, barberId } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { createBooking } = useShopStore();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedBarber, setSelectedBarber] = useState<any>(
    barberId ? MOCK_BARBERS.find(b => b.id === barberId) : null
  );
  const [selectedDate, setSelectedDate] = useState('2024-05-20');
  const [selectedTime, setSelectedTime] = useState('');

  const shop = MOCK_SHOPS.find(s => s.id === shopId) || MOCK_SHOPS[0];
  const availableBarbers = MOCK_BARBERS.filter(b => shop.barbers.includes(b.id));

  const timeSlots = ['10:00', '10:30', '11:00', '11:30', '13:00', '14:00', '14:30', '15:30', '16:00'];

  const handleComplete = async () => {
    await createBooking({
      shopId: shop.id,
      barberId: selectedBarber?.id,
      serviceId: selectedService?.id,
      date: selectedDate,
      startTime: selectedTime,
      totalPrice: selectedService?.price || 0,
    });
    setStep(4); // Success screen
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>Select Service</Text>
      {shop.services.map((service) => (
        <TouchableOpacity 
          key={service.id}
          style={[
            styles.serviceItem, 
            { backgroundColor: theme.card, borderColor: selectedService?.id === service.id ? theme.gold : 'transparent' }
          ]}
          onPress={() => setSelectedService(service)}
        >
          <View style={styles.serviceMain}>
            <Text style={[styles.serviceName, { color: theme.text }]}>{service.name}</Text>
            <Text style={[styles.serviceDesc, { color: theme.textSecondary }]}>{service.description}</Text>
          </View>
          <View style={styles.servicePriceContainer}>
            <Text style={[styles.servicePrice, { color: theme.gold }]}>${service.price}</Text>
            <Text style={[styles.serviceDuration, { color: theme.textSecondary }]}>{service.durationMinutes}m</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>Choose Barber</Text>
      <TouchableOpacity 
        style={[
          styles.barberItem, 
          { backgroundColor: theme.card, borderColor: !selectedBarber ? theme.gold : 'transparent' }
        ]}
        onPress={() => setSelectedBarber(null)}
      >
        <View style={[styles.anyBarberIcon, { backgroundColor: theme.background }]}>
          <Clock size={24} color={theme.text} />
        </View>
        <View style={styles.barberInfo}>
          <Text style={[styles.barberName, { color: theme.text }]}>Any Professional</Text>
          <Text style={[styles.barberBio, { color: theme.textSecondary }]}>Faster availability</Text>
        </View>
      </TouchableOpacity>

      {availableBarbers.map((barber) => (
        <TouchableOpacity 
          key={barber.id}
          style={[
            styles.barberItem, 
            { backgroundColor: theme.card, borderColor: selectedBarber?.id === barber.id ? theme.gold : 'transparent' }
          ]}
          onPress={() => setSelectedBarber(barber)}
        >
          <Image source={{ uri: barber.avatarUrl }} style={styles.barberAvatar} />
          <View style={styles.barberInfo}>
            <Text style={[styles.barberName, { color: theme.text }]}>{barber.fullName}</Text>
            <View style={styles.ratingBox}>
              <CheckCircle2 size={12} color={theme.gold} />
              <Text style={[styles.ratingText, { color: theme.gold }]}>{barber.rating} • Expert</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>Date & Time</Text>
      <View style={styles.timeGrid}>
        {timeSlots.map((time) => (
          <TouchableOpacity 
            key={time}
            style={[
              styles.timeSlot, 
              { 
                backgroundColor: selectedTime === time ? theme.gold : theme.card,
                borderColor: theme.border 
              }
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[
              styles.timeText, 
              { color: selectedTime === time ? '#000' : theme.text }
            ]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSuccess = () => (
    <View style={styles.successContainer}>
      <CheckCircle2 size={100} color={theme.gold} />
      <Text style={[styles.successTitle, { color: theme.text }]}>Booking Confirmed!</Text>
      <Text style={[styles.successSubtitle, { color: theme.textSecondary }]}>
        Your appointment at {shop.name} is scheduled for May 20 at {selectedTime}.
      </Text>
      <Button 
        title="View My Bookings" 
        onPress={() => router.push('/(client)/bookings')}
        style={styles.successButton}
      />
      <TouchableOpacity onPress={() => router.push('/(client)')}>
        <Text style={[styles.homeLink, { color: theme.gold }]}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );

  const getNextDisabled = () => {
    if (step === 1) return !selectedService;
    if (step === 3) return !selectedTime;
    return false;
  };

  if (step === 4) return renderSuccess();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()}>
          <ChevronLeft size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Booking</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.progressBar}>
        {[1, 2, 3].map((s) => (
          <View 
            key={s} 
            style={[
              styles.progressDot, 
              { backgroundColor: s <= step ? theme.gold : theme.border, width: s === step ? 30 : 10 }
            ]} 
          />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        {selectedService && (
          <View style={styles.priceSummary}>
            <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>Total Price</Text>
            <Text style={[styles.totalAmount, { color: theme.gold }]}>${selectedService.price}</Text>
          </View>
        )}
        <Button 
          title={step === 3 ? "Confirm Booking" : "Next"} 
          onPress={() => step < 3 ? setStep(step + 1) : handleComplete()}
          disabled={getNextDisabled()}
          style={styles.nextButton}
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
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    height: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: Spacing.md,
  },
  progressDot: {
    height: 6,
    borderRadius: 3,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: Spacing.xl,
  },
  serviceItem: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
  },
  serviceMain: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 13,
  },
  servicePriceContainer: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '700',
  },
  serviceDuration: {
    fontSize: 12,
  },
  barberItem: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
  },
  barberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  anyBarberIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  barberInfo: {
    flex: 1,
  },
  barberName: {
    fontSize: 16,
    fontWeight: '700',
  },
  barberBio: {
    fontSize: 12,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    width: (width - 60) / 3,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 40 : Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    ...Shadows.large,
  },
  priceSummary: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800',
  },
  nextButton: {
    flex: 2,
    maxWidth: 200,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    textAlign: 'center',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  successButton: {
    width: '100%',
    marginBottom: 20,
  },
  homeLink: {
    fontSize: 16,
    fontWeight: '700',
  },
});

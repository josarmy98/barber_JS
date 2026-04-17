import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  SafeAreaView, 
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Info, 
  ChevronRight,
  ShieldCheck,
  Smartphone
} from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MOCK_SHOPS, MOCK_BARBERS } from '@/services/mock-data';

const { width, height } = Dimensions.get('window');

export default function ShopDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  const shop = MOCK_SHOPS.find(s => s.id === id);
  const [activeTab, setActiveTab] = useState<'Services' | 'Barbers' | 'Info'>('Services');

  if (!shop) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Shop not found</Text>
      </View>
    );
  }

  // Filter barbers that belong to this shop
  const shopBarbers = MOCK_BARBERS.filter(b => shop.barbers.includes(b.id));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: shop.images[0] }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
          <SafeAreaView style={styles.headerOverlay}>
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: 'rgba(255,255,255,0.3)' }]}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFF" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Content Start */}
        <View style={[styles.content, { backgroundColor: theme.background }]}>
          <View style={styles.contentHeader}>
            <View style={styles.row}>
              <Text style={[styles.shopName, { color: theme.text }]}>{shop.name}</Text>
              {shop.isPremium && <ShieldCheck size={20} color={theme.gold} />}
            </View>
            <View style={styles.ratingRow}>
              <Star size={16} color={theme.gold} fill={theme.gold} />
              <Text style={[styles.ratingText, { color: theme.text }]}>{shop.rating}</Text>
              <Text style={[styles.reviewText, { color: theme.textSecondary }]}>({shop.reviewCount} reviews)</Text>
            </View>
            <View style={styles.locationRow}>
              <MapPin size={16} color={theme.textSecondary} />
              <Text style={[styles.addressText, { color: theme.textSecondary }]} numberOfLines={1}>
                {shop.address}
              </Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={[styles.tabs, { borderBottomColor: theme.border }]}>
            {(['Services', 'Barbers', 'Info'] as const).map((tab) => (
              <TouchableOpacity 
                key={tab} 
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tab, 
                  activeTab === tab && { borderBottomColor: theme.gold, borderBottomWidth: 3 }
                ]}
              >
                <Text style={[
                  styles.tabText, 
                  { color: activeTab === tab ? theme.text : theme.textSecondary }
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'Services' && (
              <View>
                {shop.services.slice(0, 3).map((s: any) => (
                  <TouchableOpacity 
                    key={s.id} 
                    style={[styles.serviceCard, { backgroundColor: theme.card }]}
                    onPress={() => {}} // Navigate to booking with this service
                  >
                    <View style={styles.serviceInfo}>
                      <Text style={[styles.serviceName, { color: theme.text }]}>{s.name}</Text>
                      <Text style={[styles.serviceDesc, { color: theme.textSecondary }]} numberOfLines={2}>
                        {s.description}
                      </Text>
                      <View style={styles.serviceMeta}>
                        <Clock size={14} color={theme.textSecondary} />
                        <Text style={[styles.metaText, { color: theme.textSecondary }]}>{s.durationMinutes} min</Text>
                      </View>
                    </View>
                    <View style={styles.servicePrice}>
                      <Text style={[styles.priceText, { color: theme.gold }]}>${s.price}</Text>
                      <TouchableOpacity style={[styles.bookChip, { backgroundColor: theme.primary }]}>
                        <Text style={styles.bookChipText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {activeTab === 'Barbers' && (
              <View>
                {shopBarbers.slice(0, 3).map((b: any) => (
                  <TouchableOpacity 
                    key={b.id} 
                    style={[styles.barberCard, { backgroundColor: theme.card }]}
                  >
                    <Image source={{ uri: b.avatarUrl }} style={styles.barberAvatar} />
                    <View style={styles.barberInfo}>
                      <Text style={[styles.barberName, { color: theme.text }]}>{b.fullName}</Text>
                      <Text style={[styles.barberSpecialty, { color: theme.textSecondary }]}>
                        {b.specialties.slice(0, 2).join(' • ')}
                      </Text>
                      <View style={styles.ratingRow}>
                        <Star size={14} color={theme.gold} fill={theme.gold} />
                        <Text style={[styles.ratingSmall, { color: theme.text }]}>{b.rating}</Text>
                      </View>
                    </View>
                    <ChevronRight size={20} color={theme.icon} />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {activeTab === 'Info' && (
              <View style={styles.infoSection}>
                <Text style={[styles.description, { color: theme.textSecondary }]}>
                  {shop.description}
                </Text>
                
                <Text style={[styles.subTitle, { color: theme.text }]}>Amenities</Text>
                <View style={styles.amenitiesGrid}>
                  {shop.amenities.map((amenity: any, i: number) => (
                    <View key={amenity} style={[styles.amenityTag, { backgroundColor: theme.card }]}>
                      <Text style={[styles.amenityText, { color: theme.textSecondary }]}>{amenity}</Text>
                    </View>
                  ))}
                </View>

                <Text style={[styles.subTitle, { color: theme.text }]}>Working Hours</Text>
                {shop.workingHours.map((hours: any) => (
                  <View key={hours.day} style={styles.hoursRow}>
                    <Text style={[styles.hoursDay, { color: theme.text }]}>{hours.day}</Text>
                    <Text style={[styles.hoursTime, { color: theme.textSecondary }]}>
                      {hours.isOpen ? `${hours.start} - ${hours.end}` : 'Closed'}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <SafeAreaView style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <View style={styles.footerContent}>
          <View>
            <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>Starting from</Text>
            <Text style={[styles.totalValue, { color: theme.text }]}>$25.00</Text>
          </View>
          <TouchableOpacity 
            style={[styles.bookButton, { backgroundColor: theme.gold }]}
            onPress={() => {}} // Navigate to full booking flow
          >
            <Text style={styles.bookButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width,
    height: 300,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: Spacing.md,
    marginTop: Platform.OS === 'android' ? 40 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -BorderRadius.xl,
    paddingTop: Spacing.lg,
    minHeight: height - 100,
  },
  contentHeader: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.xs,
  },
  shopName: {
    fontSize: 26,
    fontWeight: '800',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
  },
  reviewText: {
    fontSize: 14,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressText: {
    fontSize: 14,
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    marginBottom: Spacing.md,
  },
  tab: {
    paddingVertical: Spacing.md,
    marginRight: Spacing.lg,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 100,
  },
  serviceCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
  servicePrice: {
    alignItems: 'flex-end',
    gap: 12,
    marginLeft: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
  },
  bookChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  bookChipText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  barberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  barberAvatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  barberInfo: {
    flex: 1,
  },
  barberName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  barberSpecialty: {
    fontSize: 13,
    marginBottom: 4,
  },
  ratingSmall: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoSection: {
    gap: Spacing.lg,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.sm,
  },
  amenityText: {
    fontSize: 13,
    fontWeight: '500',
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  hoursDay: {
    fontSize: 14,
    fontWeight: '500',
  },
  hoursTime: {
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 0 : Spacing.md,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  bookButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  bookButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});

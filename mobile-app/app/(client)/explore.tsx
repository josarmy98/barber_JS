import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView,
  Image
} from 'react-native';
import { Search, MapPin, ChevronLeft, Star, Navigation } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MOCK_SHOPS } from '@/services/mock-data';

const { width, height } = Dimensions.get('window');

export default function ExploreScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Mock Map Background with a more sophisticated look */}
      <View style={[styles.mapPlaceholder, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#E8E8E8' }]}>
        {/* Abstract Map Lines */}
        <View style={[styles.mapLine, { top: 200, width: '150%', transform: [{ rotate: '45deg' }] }]} />
        <View style={[styles.mapLine, { top: 400, width: '150%', transform: [{ rotate: '-30deg' }] }]} />
        
        {MOCK_SHOPS.map((shop, i) => (
          <View 
            key={shop.id} 
            style={[
              styles.markerContainer, 
              { top: 200 + (i * 150), left: 50 + (i * 120) }
            ]}
          >
            <View style={[styles.marker, { backgroundColor: theme.gold }]}>
              <View style={styles.markerInner} />
            </View>
            <View style={[styles.markerLabel, { backgroundColor: theme.card }]}>
              <Text style={[styles.markerPrice, { color: theme.text }]}>$25+</Text>
            </View>
          </View>
        ))}
        
        <View style={styles.mapCenterInfo}>
          <Navigation size={32} color={theme.gold} style={{ opacity: 0.5 }} />
          <Text style={[styles.placeholderText, { color: theme.textSecondary }]}>Premium Map Interface</Text>
          <Text style={[styles.subtitleText, { color: theme.textSecondary }]}>Integrating with Google Maps API...</Text>
        </View>
      </View>

      <SafeAreaView style={styles.overlay}>
        <View style={styles.searchHeader}>
          <TouchableOpacity 
            style={[styles.backBtn, { backgroundColor: theme.card }]} 
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <View style={[styles.searchBar, { backgroundColor: theme.card }]}>
            <Search size={20} color={theme.icon} />
            <Text style={[styles.searchText, { color: theme.textSecondary }]}>Search in Miami...</Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
           <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.cardScroll}
            snapToInterval={width * 0.75 + 12}
            decelerationRate="fast"
           >
              {MOCK_SHOPS.map((shop) => (
                <TouchableOpacity 
                  key={shop.id}
                  activeOpacity={0.9} 
                  style={[styles.shopPreviewCard, { backgroundColor: theme.card }]}
                  onPress={() => router.push(`/(client)/shop/${shop.id}` as any)}
                >
                  <Image source={{ uri: shop.images[0] }} style={styles.shopImage} />
                  <View style={styles.shopInfo}>
                    <Text style={[styles.shopName, { color: theme.text }]} numberOfLines={1}>{shop.name}</Text>
                    <View style={styles.ratingRow}>
                       <Star size={14} color={theme.gold} fill={theme.gold} />
                       <Text style={[styles.shopMeta, { color: theme.text }]}>{shop.rating}</Text>
                       <Text style={[styles.distanceText, { color: theme.textSecondary }]}>• 0.8 mi</Text>
                    </View>
                    <TouchableOpacity style={[styles.quickBook, { backgroundColor: theme.gold }]}>
                      <Text style={styles.quickBookText}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
           </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  mapLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  mapCenterInfo: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 12,
  },
  subtitleText: {
    fontSize: 13,
    marginTop: 8,
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  marker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  markerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  markerLabel: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  markerPrice: {
    fontSize: 12,
    fontWeight: '800',
  },
  overlay: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 12,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  searchText: {
    fontSize: 15,
    fontWeight: '500',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  cardScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  shopPreviewCard: {
    width: width * 0.75,
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  shopImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
  },
  shopInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  shopName: {
    fontSize: 17,
    fontWeight: '800',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shopMeta: {
    fontSize: 14,
    fontWeight: '700',
  },
  distanceText: {
    fontSize: 12,
  },
  quickBook: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 4,
  },
  quickBookText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '800',
  },
});

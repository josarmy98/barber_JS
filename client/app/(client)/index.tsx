import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { Search, Map as MapIcon, Filter, Bell, Star, Clock, ChevronRight } from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ShopCard } from '@/components/ui/ShopCard';
import { MOCK_SHOPS } from '@/services/mock-data';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CATEGORIES = ['All', 'Haircut', 'Beard', 'Styling', 'Kids', 'Shave'];

export default function DiscoveryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { searchQuery, setSearchQuery } = useAppStore();
  const router = useRouter();

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={[styles.welcomeText, { color: theme.textSecondary }]}>Experience Excellence</Text>
        <Text style={[styles.title, { color: theme.text }]}>Miami, FL</Text>
      </View>
      <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.card }]}>
        <Bell size={24} color={theme.text} />
        <View style={[styles.notificationBadge, { backgroundColor: theme.gold }]} />
      </TouchableOpacity>
    </View>
  );

  const renderPromotions = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={{ paddingLeft: Spacing.md }}
      style={styles.promoScroll}
    >
      <TouchableOpacity style={[styles.promoCard, { backgroundColor: '#1A1A1A' }]}>
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoTag}>LIMITED OFFER</Text>
          <Text style={styles.promoTitle}>20% Off Your First Trim</Text>
          <Text style={styles.promoDesc}>At The Golden Scissor</Text>
        </View>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400' }} 
          style={styles.promoImage} 
        />
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={[styles.searchBar, { backgroundColor: theme.card }]}>
        <Search size={20} color={theme.icon} />
        <TextInput
          placeholder="Barber or shop name..."
          placeholderTextColor={theme.icon}
          style={[styles.searchInput, { color: theme.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.gold }]}>
        <Filter size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderCategories = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.categoryContainer}
    >
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat}
          onPress={() => setSelectedCategory(cat)}
          style={[
            styles.categoryItem,
            { backgroundColor: selectedCategory === cat ? theme.gold : theme.card },
            { borderColor: selectedCategory === cat ? theme.gold : theme.border }
          ]}
        >
          <Text style={[
            styles.categoryText,
            { color: selectedCategory === cat ? '#000' : theme.textSecondary }
          ]}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <FlatList
        data={MOCK_SHOPS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShopCard 
            shop={item} 
            onPress={() => router.push(`/(client)/shop/${item.id}` as any)}
          />
        )}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            {renderHeader()}
            {renderSearchBar()}
            {renderPromotions()}
            {renderCategories()}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured Shops</Text>
              <TouchableOpacity style={styles.mapToggle} onPress={() => router.push('/(client)/explore')}>
                <MapIcon size={16} color={theme.gold} />
                <Text style={[styles.mapToggleText, { color: theme.gold }]}>Map View</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  listHeader: {
    paddingVertical: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing.lg,
  },
  searchBar: {
    flex: 1,
    height: 54,
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  filterButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoScroll: {
    marginBottom: Spacing.lg,
    marginHorizontal: -Spacing.md,
  },
  promoCard: {
    width: width * 0.85,
    height: 140,
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginRight: 12,
    overflow: 'hidden',
  },
  promoTextContainer: {
    flex: 1,
    zIndex: 1,
  },
  promoTag: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  promoTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  promoDesc: {
    color: '#AAA',
    fontSize: 13,
  },
  promoImage: {
    width: 120,
    height: '140%',
    position: 'absolute',
    right: -20,
    transform: [{ rotate: '15deg' }],
    opacity: 0.8,
  },
  categoryContainer: {
    gap: 10,
    paddingBottom: Spacing.lg,
  },
  categoryItem: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  mapToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mapToggleText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

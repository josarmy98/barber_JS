import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin, Clock } from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Barbershop } from '@/types';

interface ShopCardProps {
  shop: Barbershop;
  onPress: () => void;
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop, onPress }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.card }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: shop.images[0] }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: theme.text }]}>{shop.name}</Text>
          <View style={styles.ratingRow}>
            <Star size={14} color={theme.gold} fill={theme.gold} />
            <Text style={[styles.ratingText, { color: theme.text }]}>{shop.rating}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={14} color={theme.textSecondary} />
          <Text style={[styles.infoText, { color: theme.textSecondary }]} numberOfLines={1}>
            {shop.address}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.tags}>
            {shop.services.slice(0, 2).map((s) => (
              <View key={s.id} style={[styles.tag, { backgroundColor: theme.background }]}>
                <Text style={[styles.tagText, { color: theme.textSecondary }]}>{s.name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.status}>
            <Clock size={14} color={theme.gold} />
            <Text style={[styles.statusText, { color: theme.gold }]}>Open Now</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

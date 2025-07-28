import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PrimaryButton from './PrimaryButton';

const { height } = Dimensions.get('window');

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

interface FilterState {
  styleCategory: string[];
  seasonWeather: string[];
  occasion: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    styleCategory: [],
    seasonWeather: [],
    occasion: [],
  });

  const styleCategories = [
    'Minimalist',
    'Streetwear',
    'Feminine',
    'Formal / Office',
    'Y2K',
    'Vintage',
    'Korean / K-Fashion',
    'Boho / Indie',
  ];

  const seasonWeather = [
    'Summer',
    'Rainy',
    'Fall',
    'Tropical/Beachy',
    'Winter',
  ];

  const occasions = [
    'Daily Casual',
    'Date Night',
    'Office/Work',
    'Vacation',
    'Party',
    'Wedding Guest',
    'Airport Look',
    'Night Out',
  ];

  const toggleFilter = (category: keyof FilterState, item: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const handleSave = () => {
    onApplyFilters(selectedFilters);
    onClose();
  };

  const clearFilters = () => {
    setSelectedFilters({
      styleCategory: [],
      seasonWeather: [],
      occasion: [],
    });
  };

  const FilterSection = ({ 
    title, 
    items, 
    category 
  }: { 
    title: string; 
    items: string[]; 
    category: keyof FilterState;
  }) => (
    <View style={styles.filterSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.filtersContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterChip,
              selectedFilters[category].includes(item) && styles.filterChipSelected
            ]}
            onPress={() => toggleFilter(category, item)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilters[category].includes(item) && styles.filterChipTextSelected
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.bottomSheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>Filter</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                onPress={clearFilters} 
                style={styles.clearButton}
                activeOpacity={0.7}
              >
                <Ionicons name="refresh-outline" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={onClose} 
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Content */}
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <FilterSection
              title="Style Category"
              items={styleCategories}
              category="styleCategory"
            />

            <FilterSection
              title="Season / Weather"
              items={seasonWeather}
              category="seasonWeather"
            />

            <FilterSection
              title="Occasion"
              items={occasions}
              category="occasion"
            />
          </ScrollView>

          {/* Save Button */}
          <View style={styles.footer}>
            <PrimaryButton title='Save' onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    height: height * 0.8,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 6,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clearButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    // backgroundColor: '#F6F7F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    // backgroundColor: '#F6F7F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#343640',
    marginBottom: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 16,
    // paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#666666',
    textAlign: 'center',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 50,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#FFFFFF',
  },
});

export default FilterModal;
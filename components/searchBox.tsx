import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import FilterModal from './searchFilter';

interface FilterState {
  styleCategory: string[];
  seasonWeather: string[];
  occasion: string[];
}

interface SearchBoxProps {
  onSearch?: (query: string) => void;
  onFiltersApplied?: (filters: FilterState) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, onFiltersApplied }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  const handleFiltersApplied = (filters: FilterState) => {
    const hasFilters = Object.values(filters).some(category => category.length > 0);
    setHasActiveFilters(hasFilters);
    onFiltersApplied?.(filters);
  };

  return (
    <>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#000" style={{ marginRight: 8 }} />
          <TextInput 
            placeholder="Search" 
            style={styles.searchInput} 
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          <TouchableOpacity 
            style={[
              styles.filterBtn,
              hasActiveFilters && styles.filterBtnActive
            ]}
            onPress={() => setFilterModalVisible(true)}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="options-outline" 
              size={22} 
              color={hasActiveFilters ? "#FFFFFF" : "#000"} 
            />
            {hasActiveFilters && <View style={styles.activeFilterDot} />}
          </TouchableOpacity>
        </View>
      </View>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApplyFilters={handleFiltersApplied}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F7F9',
    borderRadius: 100,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#000',
  },
  filterBtn: {
    marginLeft: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: 8,
    position: 'relative',
  },
  filterBtnActive: {
    backgroundColor: '#000000',
  },
  activeFilterDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4757',
  },
});

export default SearchBox;
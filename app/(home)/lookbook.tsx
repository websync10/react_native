import Header from '@/components/Header';
import MobileSidebar from '@/components/home/Sidebar';
import LookbookCard from '@/components/lookbookCard';
import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const looks = [
  {
    id: '1',
    image: require('@/assets/images/lookDetail1.png'),
    title: 'Beach Vibe',
    date: 'june 27, 2025',
    isPublic: true,
    people: [
      require('@/assets/images/styles/businesscasual-male.png'),
    ],
  },
  {
    id: '2',
    image: require('@/assets/images/styles/minimal-female.png'),
    title: 'Beach Vibe',
    date: 'june 27, 2025',
    isPublic: true,
    people: [
      require('@/assets/images/styles/bohemian-female.png'),
      require('@/assets/images/styles/businesscasual-male.png'),
    ],
  },
];

const userData = {
  id: 'user-1',
  name: 'Jacklaw_',
  fullName: 'Jack Lawson',
  avatar: require('@/assets/images/styles/businesscasual-male.png'),
  profileImage: require('@/assets/images/styles/businesscasual-male.png'),
  followers: [require('@/assets/images/styles/bohemian-female.png'), require('@/assets/images/styles/businesscasual-male.png')],
};

const Lookbook = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 16,  }}>
    <Header title='LookBook'/>
      <MobileSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        userData={userData}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.pageTitle}>My Looks</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#282A37" style={{ marginRight: 8 }} />
            <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#282A37" />
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          {looks.map(look => (
            <LookbookCard
              key={look.id}
              image={look.image}
              title={look.title}
              date={look.date}
              isPublic={look.isPublic}
              people={look.people}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 22,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    marginTop: 16,
    marginLeft: 20,
    marginBottom: 20,
    color: '#343640',
  },
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
    color: '#282A37',
  },
});

export default Lookbook;

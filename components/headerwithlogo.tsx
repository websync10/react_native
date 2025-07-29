import { Menu } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MobileSidebar from './home/Sidebar';

interface HeaderWithLogoProps {
  userData: User | null;
}

const HeaderWithLogo = ({ userData }: HeaderWithLogoProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <View style={styles.headerSection}>
      <TouchableOpacity onPress={() => setSidebarVisible(true)} style={{ left: 10, }}>
        <Menu className='w-4 h-4' />
      </TouchableOpacity>
      <MobileSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        userData={userData}
      />
      <View style={styles.logoCenterContainer}>
        <Image
          source={require('@/assets/images/headerlogo.png')}
          resizeMode="contain"
          style={styles.bagLogo}
        />
        <Text style={styles.logoText}>Myuze</Text>
      </View>

      <View style={{ width: 24 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  // Header Section
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBlock: 28,
  },
  backButton: {
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  backArrow: {
    width: 8,
    height: 16,
  },
  logoCenterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bagLogo: {
    width: 28,
    height: 28,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00272E',
    marginTop: 4
  },
})

export default HeaderWithLogo
import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const HeaderWithLogo = () => {
  return (
    <View style={styles.headerSection}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Image style={styles.backArrow} source={require('@/assets/images/icons/leftarrow.png')} /> 
      </TouchableOpacity>

      <View style={styles.logoCenterContainer}>
        <Image
          source={require('@/assets/images/headerlogo.png')}
          resizeMode="contain"
          style={styles.bagLogo}
        />
        <Text style={styles.logoText}>Myuze</Text>
      </View>

      {/* Right Spacer */}
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
    paddingTop: 42,
    paddingBlock:28,
  },
  backButton: {
    width:20,
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
    marginTop:4
  },
})

export default HeaderWithLogo
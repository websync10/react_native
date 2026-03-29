import { FontFamily } from '@/constants/Fonts'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface HeaderWithLogoProps {
  onMenuPress?: () => void
  onNotificationPress?: () => void
  showBackButton?: boolean
  onBackPress?: () => void
  showNotification?: boolean
  notificationCount?: number
}

const HeaderWithLogo = ({
  onMenuPress,
  onNotificationPress,
  showBackButton = false,
  onBackPress,
  showNotification = true,
  notificationCount = 0
}: HeaderWithLogoProps) => {
  return (
    <View style={styles.header}>
      {/* Left Button - Menu or Back */}
      {showBackButton ? (
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <SimpleLineIcons name="menu" size={20} color="black" />
        </TouchableOpacity>
      )}

      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Image
            source={require('@/assets/images/baglogo.png')}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </View>
        <Text style={styles.brandText}>Myuze</Text>
      </View>

      {/* Right Button - Notification or Spacer */}
      {showNotification ? (
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <View style={styles.notificationContainer}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 99 ? '99+' : notificationCount.toString()}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.headerButton} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 0,
    marginBottom: 8,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F8F9FA',
    borderColor: '#E5E5EA',
    borderWidth: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  logoIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
  },
  logoImage: {
    width: 28,
    height: 28,
  },
  brandText: {
    fontSize: 24,
    fontFamily: FontFamily.HelveticaNeue.Bold,
    color: '#00272E',
    textAlign: 'center',
    top: 4,
    right: 8,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    textAlign: 'center',
    top:-2,
  },
})

export default HeaderWithLogo
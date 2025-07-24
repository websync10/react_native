import React from 'react'
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

interface StyleCardProps {
  title: string
  imageSource: any
  isSelected?: boolean
  onPress: () => void
}

const StyleCard = ({ 
  title, 
  imageSource, 
  isSelected = false, 
  onPress 
}: StyleCardProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Card Image */}
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>

      {/* Card Title */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 16,
    width: '48%',
    aspectRatio: 1.10,
    borderWidth: 1.5,
    borderColor: 'transparent',

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 20,

    // Android Shadow (use elevation)
    elevation: 3,

    // Optional smoothness with padding or overflow
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
  },
  cardSelected: {
    borderColor: '#000000',
  },
  imageContainer: {
    height: '65%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 8,
    marginBottom: 2,
  },
  cardImage: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
  },
  cardContent: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#737373',
    textAlign: 'center',

  },
})

export default StyleCard

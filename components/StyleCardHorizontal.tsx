import { FontFamily } from '@/constants/Fonts'
import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

interface StyleCardHorizontalProps {
  title: string
  description: string
  imageSource: any
  isSelected?: boolean
  onPress: () => void
}

const StyleCardHorizontal = ({ 
  title, 
  description,
  imageSource, 
  isSelected = false, 
  onPress 
}: StyleCardHorizontalProps) => {
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

      {/* Card Content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {title}
        </Text>
        <Text style={styles.cardDescription}>
          {description}
        </Text>
      </View>

      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        <View style={[
          styles.checkbox,
          isSelected && styles.checkboxSelected
        ]}>
          {isSelected && (
            <Image style={{width:20, height:20,}} source={require('@/assets/images/icons/Checkbox.png')} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardSelected: {
    borderColor: '#000000',
    backgroundColor: '#F8F9FA',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#1F2937',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
    width:20,
    height:20
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
})

export default StyleCardHorizontal

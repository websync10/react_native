import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface PrimaryButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
}

const PrimaryButton = ({ title, onPress, disabled = false }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.btn, disabled && styles.btnDisabled]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.btnText, disabled && styles.btnTextDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 52,
    borderRadius: 8,
    backgroundColor: '#000000',
    paddingHorizontal: 14,
    marginBottom: 26,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  btnDisabled: {
    backgroundColor: '#CCCCCC',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  btnTextDisabled: {
    color: '#666666',
  },
})

export default PrimaryButton
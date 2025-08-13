
import Header from '@/components/Header';
import { FontFamily } from '@/constants/Fonts';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Privacy Policy" />
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Privacy policy - Myuze</Text>
        <Text style={styles.updated}>Last updated: July 2, 2025</Text>
        <Text style={styles.intro}>
          At Myuze, your privacy matters. This policy explains what data we collect, how we use it, and the choices you have.
        </Text>

        <Text style={styles.sectionTitle}>1. What We Collect</Text>
        <Text style={styles.sectionSubtext}>We may collect and store the following information:</Text>
        <View style={styles.bulletSection}>
          <Text style={styles.bulletItem}>• Account Information: Name, email address, profile photo (optional).</Text>
          <Text style={styles.bulletItem}>• User-Generated Content: Saved looks, outfit creations, videos, captions, comments.</Text>
          <Text style={styles.bulletItem}>• Usage Data: How you interact with the app (e.g. buttons clicked, screens visited).</Text>
          <Text style={styles.bulletItem}>• Device Info: Device type, operating system, app version.</Text>
        </View>

        <Text style={styles.sectionTitle}>2. How We Use Your Data</Text>
        <Text style={styles.sectionSubtext}>Your data is used to:</Text>
        <View style={styles.bulletSection}>
          <Text style={styles.bulletItem}>• Provide personalized outfit suggestions.</Text>
          <Text style={styles.bulletItem}>• Improve app features and experience.</Text>
          <Text style={styles.bulletItem}>• Let you save, share, and manage your looks.</Text>
          <Text style={styles.bulletItem}>• Enable social features (e.g. likes, comments, votes).</Text>
          <Text style={styles.bulletItem}>• Offer customer support and updates.</Text>
        </View>

        <Text style={styles.sectionTitle}>3. Sharing & Visibility</Text>
        <View style={styles.bulletSection}>
          <Text style={styles.bulletItem}>• Your looks are private by default, unless you choose to make them Public.</Text>
          <Text style={styles.bulletItem}>• Public looks may appear in Discover Feed and be visible to other users.
</Text>
          <Text style={styles.bulletItem}>• You can share your looks externally to Instagram, TikTok, and other platforms (optional).</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#222',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'left',
  },
  updated: {
    fontSize: 13,
    color: '#A0A0A0',
    marginBottom: 16,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  intro: {
    fontSize: 15,
    color: '#222',
    marginBottom: 20,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#222',
    fontFamily: FontFamily.HelveticaNeue.Medium,
    marginTop: 18,
    marginBottom: 2,
  },
  sectionSubtext: {
    fontSize: 14,
    color: '#7A7A7A',
    fontFamily: FontFamily.HelveticaNeue.Regular,
    marginBottom: 6,
  },
  bulletSection: {
    marginLeft: 8,
    marginBottom: 10,
  },
  bulletItem: {
    fontSize: 14,
    color: '#222',
    fontFamily: FontFamily.HelveticaNeue.Regular,
    marginBottom: 4,
    lineHeight: 20,
  },
});

export default PrivacyPolicy;

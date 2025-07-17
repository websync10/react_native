import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // App Container Styles
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    width: 100,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 5,
  },
  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },

  // Title Styles
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },

  // Section Styles
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },

  // Dropdown Styles
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },

  // Slider Styles
  sliderContainer: {
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#D2691E',
    width: 20,
    height: 20,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },

  // Profile Photo Styles
  profileContainer: {
    alignItems: 'center',
  },
  silhouette: {
    width: 120,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  silhouetteBody: {
    alignItems: 'center',
  },
  silhouetteHead: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 5,
  },
  silhouetteTorso: {
    width: 40,
    height: 60,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 20,
    marginBottom: 5,
  },
  silhouetteArms: {
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    width: 80,
    justifyContent: 'space-between',
  },
  silhouetteArm: {
    width: 15,
    height: 50,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 7,
  },
  silhouetteLegs: {
    flexDirection: 'row',
    width: 30,
    justifyContent: 'space-between',
  },
  silhouetteLeg: {
    width: 12,
    height: 70,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 6,
  },

  // Button Styles
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#000',
    marginHorizontal: 20,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelText: {
    fontSize: 14,
    color: '#666',
  },

  // Info Section Styles
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    marginTop: 6,
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },

  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#6366F1',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#6366F1',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
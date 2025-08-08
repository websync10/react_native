import { FontFamily } from '@/constants/Fonts';
import { deleteLookbook, toggleLookbookVisibility } from '@/lib/actions/users/supabaseUserLookbookActions';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
const LookbookCard = ({
  id,
  image,
  title,
  date,
  is_public,
}: {
  id: string;
  image: any;
  title: string;
  date: string;
  is_public: boolean;
  onMorePress?: () => void;
  onDelete?: (id: string) => void;
}) => (
  <CardWithModals
    id={id}
    image={image}
    title={title}
    date={date}
    is_public={is_public}
    onDelete={null}
  />
);
const CardWithModals = ({ id, image, title, date, is_public, onDelete }: any) => {
  const [manageVisible, setManageVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = React.useState(false);

  const router = useRouter();
  const { userId } = useOnboardingStore()
  const [isPublic, setIsPublic] = useState(is_public);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}
      onPress={() =>
        router.push({
          pathname: "/pages/mylookDetails",
          params: { image: image.uri }
        })
      }
    >
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <TouchableOpacity style={styles.moreBtn} onPress={() => setManageVisible(true)}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#222" />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>
          Created {date}  <Text style={{ color: '#E6E7EC', }}>•</Text>  {isPublic ? 'Public' : 'Private'}
        </Text>
      </View>

      <Modal
        visible={manageVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setManageVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Manage this look</Text>
            <TouchableOpacity style={{ position: 'absolute', top: 24, right: 24 }} onPress={() => setManageVisible(false)}>
              <Ionicons name="close" size={22} color="#343640" />
            </TouchableOpacity>
            <View style={styles.optionsWrapper}>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={async () => {
                  await toggleLookbookVisibility(id, userId, true);
                  setIsPublic(true)
                  setManageVisible(false);
                }}
              >
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: 16 }}>
                  <Path d="M2 11.5C2 6.25329 6.25329 2 11.5 2C11.6585 2 11.8161 2.00388 11.9727 2.01155M2 11.5H10.5407H13.3584M2 11.5C2 16.3278 5.60126 20.3145 10.264 20.9203M20.8233 9.6667C19.9983 5.44717 16.3802 2.22752 11.9727 2.01155M11.9727 2.01155V12.6377" stroke="black" strokeWidth={1.3} strokeLinecap="round" />
                  <Path d="M4.09961 5.91968C5.84099 6.47629 8.50921 6.8324 11.5003 6.8324C11.6588 6.8324 11.8164 6.8314 11.973 6.82942C14.826 6.79341 17.3482 6.43318 18.9962 5.88873" stroke="black" strokeWidth={1.3} strokeLinecap="round" />
                  <Path d="M10.6825 15.297C8.02505 15.4376 5.67966 16.2575 4.09863 17.4757" stroke="black" strokeWidth={1.3} strokeLinecap="round" />
                  <Path d="M9.99211 20.8087C8.96842 19.8179 8.14272 18.1012 7.67089 15.9801C7.39251 14.7287 7.2373 13.3365 7.2373 11.8695C7.2373 6.41871 9.37997 2 12.0231 2C14.4395 2 16.4376 5.69314 16.7626 10.4917" stroke="black" strokeWidth={1.3} strokeLinecap="round" />
                  <Circle cx="16.3483" cy="16.348" r="5.65198" stroke="black" strokeWidth={1.3} />
                  <Circle cx="16.3476" cy="15.2748" r="1.93357" stroke="black" strokeWidth={1.3} />
                  <Path d="M19.9226 20.8088C19.3011 19.4563 17.9345 18.5172 16.3485 18.5172C14.7626 18.5172 13.396 19.4563 12.7744 20.8088" stroke="black" strokeWidth={1.3} />
                </Svg>
                <View style={styles.optionTextWrapper}>
                  <Text style={styles.optionTitle}>Set to Public</Text>
                  <Text style={styles.optionDesc}>This look will be visible to others in Discover.</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={async () => {
                  const response = await toggleLookbookVisibility(id, userId, false);
                  if (response.success) {
                    setIsPublic(false)
                    setManageVisible(false);
                  }
                }}
              >
                <Svg width="24" height="26" viewBox="0 0 24 26" fill="none" style={{ marginRight: 16 }}>
                  <Circle cx="17.5309" cy="18.7698" r="5.65198" stroke="black" strokeWidth={1.3} />
                  <Circle cx="17.5303" cy="17.6965" r="1.93357" stroke="black" strokeWidth={1.3} />
                  <Path d="M21.1052 23.2305C20.4837 21.8781 19.1171 20.939 17.5311 20.939C15.9452 20.939 14.5786 21.8781 13.957 23.2305" stroke="black" strokeWidth={1.3} />
                  <Path d="M17.4639 11.2262V10.7487C17.4639 9.8258 16.7157 9.07764 15.7928 9.07764H2.48748C1.56457 9.07764 0.816406 9.8258 0.816406 10.7487V19.7556C0.816406 20.6785 1.56457 21.4267 2.48748 21.4267H10.5179" stroke="black" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
                  <Circle cx="9.14237" cy="14.4209" r="1.9578" fill="black" />
                  <Path d="M9.1416 14.4209V17.9341" stroke="black" strokeWidth={1.3} strokeLinecap="round" />
                  <Path d="M3.82812 9.07764L3.82812 5.90372C3.82812 3.05956 6.13378 0.753906 8.97794 0.753906V0.753906C11.8221 0.753906 14.1278 3.05956 14.1278 5.90372L14.1278 9.07764" stroke="black" strokeWidth={1.3} strokeLinejoin="round" />
                </Svg>
                <View style={styles.optionTextWrapper}>
                  <Text style={styles.optionTitle}>Set to Private</Text>
                  <Text style={styles.optionDesc}>Only you can see this look in your Lookbook.</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.modalDivider} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                setManageVisible(false);
                setDeleteVisible(true);
              }}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={deleteVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalContainer}>
            <View style={styles.deleteIconCircle}>
              <Image source={require('@/assets/images/icons/warningDelete.png')} style={{ width: 24, height: 44 }} />
            </View>
            <Text style={styles.deleteModalTitle}>Are you sure you want to delete this look?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmDeleteBtn}
                onPress={async () => {
                  try {
                    const { error } = await deleteLookbook(id, userId);
                    if (!error) {
                      onDelete?.(id)
                    } else {
                      console.error('Failed to delete:', error);
                    }
                  } catch (err) {
                    console.error('Error deleting:', err);
                  } finally {
                    setDeleteVisible(false);
                    setManageVisible(false);
                  }
                }}
              >
                <Text style={styles.confirmDeleteText}>Yes, delete it</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelDeleteBtn}
                onPress={() => setDeleteVisible(false)}
              >
                <Text style={styles.cancelDeleteText} onPress={() => {
                  setDeleteVisible(false);
                }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: .5,
    borderColor: '#ecedf2',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#eee',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  moreBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
  },
  peopleGroup: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
  },
  peopleAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
  },
  info: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#343640',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#8288A0',
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end', // changed from 'center' to 'flex-end'
    alignItems: 'flex-end',
    // paddingHorizontal: 20,
    paddingBottom: 0, // optional, can adjust if needed
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    width: '100%',
    // maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    marginBottom: 24,
    color: '#000000',
  },
  optionsWrapper: {
    // marginBottom: 18,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E6E7EC',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionTextWrapper: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#343640',
    marginBottom: 2,
  },
  optionDesc: {
    fontSize: 12,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#8288A0',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E6E7EC',
    marginVertical: 18,
  },
  deleteButton: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#D70100',
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  deleteText: {
    color: '#F84D64',
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    letterSpacing: 0.2,
  },
  deleteModalContainer: {
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOpacity: 0.12,
    // shadowRadius: 16,
    // elevation: 16,
    width: '100%',
    // maxWidth: 340,
  },
  deleteIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F7F3F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  confirmDeleteBtn: {
    backgroundColor: '#000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  confirmDeleteText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    textAlign: 'center',
  },
  cancelDeleteBtn: {
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#8288A0',
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
  },
  cancelDeleteText: {
    color: '#8288A0',
    fontSize: 17,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    textAlign: 'center',
  },
  deleteModalTitle: {
    fontSize: 18,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#343640',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },

});

export default LookbookCard;
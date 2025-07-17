import { styles } from '@/assets/styles/fitting-styles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Slider } from 'react-native-elements';

const FittingScreen = () => {
    const [skinTone, setSkinTone] = useState('Limestone');
    const [clothingSize, setClothingSize] = useState(0.5);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={styles.progressFill} />
                    </View>
                    <Text style={styles.progressText}>2 of 4</Text>
                </View>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Help Us Find Your Fit</Text>
                <Text style={styles.subtitle}>Please complete your fit information</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>What's your skin tone?</Text>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>{skinTone}</Text>
                    <Ionicons name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Clothing size</Text>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        value={clothingSize}
                        onValueChange={setClothingSize}
                        minimumTrackTintColor="#D2691E"
                        maximumTrackTintColor="#E0E0E0"
                        thumbStyle={styles.sliderThumb}
                    />
                </View>
                <Text style={styles.helperText}>
                    Help us understand your clothing size to improve your fitting.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile Photo</Text>
                <View style={styles.profileContainer}>
                    <View style={styles.silhouette}>
                        <View style={styles.silhouetteBody}>
                            <View style={styles.silhouetteHead} />
                            <View style={styles.silhouetteTorso} />
                            <View style={styles.silhouetteArms}>
                                <View style={styles.silhouetteArm} />
                                <View style={styles.silhouetteArm} />
                            </View>
                            <View style={styles.silhouetteLegs}>
                                <View style={styles.silhouetteLeg} />
                                <View style={styles.silhouetteLeg} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.infoText}>
                        Please keep this in a fitting room/closet clean and fitting appropriate for the photo.
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.infoText}>
                        Our AI will analyze your body shape and size to help you find the best fit.
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.infoText}>
                        Your photo will not be shared or stored in our servers.
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const TabScreen = ({ title }: { title: any }) => (
    <View style={styles.tabContent}>
        <Text style={styles.tabTitle}>{title}</Text>
    </View>
);

const App = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { name: 'Fitting', component: FittingScreen },
        { name: 'Profile', component: () => <TabScreen title="Profile" /> },
        { name: 'History', component: () => <TabScreen title="History" /> },
        { name: 'Settings', component: () => <TabScreen title="Settings" /> },
    ];

    const ActiveComponent = tabs[activeTab].component;

    return (
        <SafeAreaView style={styles.appContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Main Content */}
            <View style={styles.content}>
                <ActiveComponent />
            </View>

            {/* Custom Tab Bar */}
            <View style={styles.tabBar}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.tabItem,
                            activeTab === index && styles.activeTabItem
                        ]}
                        onPress={() => setActiveTab(index)}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === index && styles.activeTabText
                        ]}>
                            {tab.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default App;
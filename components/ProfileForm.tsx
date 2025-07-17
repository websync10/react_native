import { Link, useRouter } from "expo-router"
import {
    Camera,
    ChevronDown,
    ChevronLeft,
    Image as ImageIcon
} from "lucide-react-native"
import { useState } from "react"
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

interface ProfileFormProps{
    fullname: string
}

export default function ProfileForm({
    fullname
}: ProfileFormProps) {
    const [fullName, setFullName] = useState(fullname)
    const [gender, setGender] = useState("Male")
    const [skinTone, setSkinTone] = useState("Yellow")
    const [size, setSize] = useState("XS")
    const [showSkinToneDropdown, setShowSkinToneDropdown] = useState(false)
    const [showSizeDropdown, setShowSizeDropdown] = useState(false)
    const router = useRouter();

    const handleSubmit = () => {
        console.log('handle submit fired')
        if (fullName != "" && gender != "" && skinTone != "" && size != "") {
            const userData = {
                fullname: fullName,
                gender: gender,
                skinToned: skinTone,
                size: size,
                style: "",
            }
            console.log("userData", userData)
            router.replace("/(home)")
        } else{
            Alert.alert("Please Fill all fields")
        }
    }

    const skinToneOptions = ["Yellow", "Fair", "Medium", "Olive", "Brown", "Dark"]
    const sizeOptionsM = ["XS", "S", "M", "L", "XL", "XXL"]
    const sizeOptionsF = ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL"]

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "75%",
                    marginBottom: 20,
                }}>
                    <Link href="/(auth)/login" asChild>
                        <TouchableOpacity>
                            <ChevronLeft />
                        </TouchableOpacity>
                    </Link>

                    <Text style={{
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: '900',
                    }}>Edit Profile</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter Full Name"
                        style={styles.textInput}
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.radioGroup}>
                        <TouchableOpacity onPress={() => setGender("Male")} style={styles.radioOption}>
                            <View style={styles.radioButton}>{gender === "Male" && <View style={styles.radioButtonSelected} />}</View>
                            <Text style={styles.radioText}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setGender("Female")} style={styles.radioOption}>
                            <View style={styles.radioButton}>
                                {gender === "Female" && <View style={styles.radioButtonSelected} />}
                            </View>
                            <Text style={styles.radioText}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Skin Tone</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity onPress={() => setShowSkinToneDropdown(!showSkinToneDropdown)} style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{skinTone}</Text>
                            <ChevronDown size={20} color="#6B7280" />
                        </TouchableOpacity>

                        {showSkinToneDropdown && (
                            <View style={styles.dropdownMenu}>
                                {skinToneOptions.map((option, index) => (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => {
                                            setSkinTone(option)
                                            setShowSkinToneDropdown(false)
                                        }}
                                        style={[styles.dropdownItem, index === skinToneOptions.length - 1 && styles.dropdownItemLast]}
                                    >
                                        <Text style={styles.dropdownItemText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.sizeSection}>
                    <Text style={styles.label}>Size</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity
                            onPress={() => setShowSizeDropdown(!showSizeDropdown)}
                            style={styles.dropdown}
                        >
                            <Text style={styles.dropdownText}>{size}</Text>
                            <ChevronDown size={20} color="#6B7280" />
                        </TouchableOpacity>

                        {showSizeDropdown && (
                            <View style={styles.dropdownMenu}>
                                {(gender === 'Male' ? sizeOptionsM : sizeOptionsF).map((option, index, array) => (
                                    <TouchableOpacity
                                        key={option || `empty-${index}`}
                                        onPress={() => {
                                            setSize(option)
                                            setShowSizeDropdown(false)
                                        }}
                                        style={[
                                            styles.dropdownItem,
                                            index === array.length - 1 && styles.dropdownItemLast
                                        ]}
                                    >
                                        <Text style={styles.dropdownItemText}>
                                            {option || 'Select Size'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                <Text style={styles.helpText}>Share your usual size to help us suggest the best fit</Text>

                <View style={styles.section}>
                    <Text style={styles.label}>Profile Photo</Text>

                    <View style={styles.photoContainer}>
                        <View style={styles.humanFigure}>
                            <View style={styles.figureContainer}>
                                <View style={styles.head} />
                                <View style={styles.body} />
                                <View style={[styles.arm, styles.leftArm]} />
                                <View style={[styles.arm, styles.rightArm]} />
                                <View style={styles.legs}>
                                    <View style={styles.leg} />
                                    <View style={styles.leg} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.iconRow}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Camera size={20} color="#6B7280" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <ImageIcon size={20} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.infoItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.infoText}>
                            Please keep the shooting environment clean and lighting appropriate for best fitting effect.
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.infoText}>Please wear fitted clothes and keep your hands out of your pockets.</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.infoText}>Your photo stays private and securely stored — never shared.</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        handleSubmit()
                    }}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    section: {
        marginBottom: 24,
    },
    sizeSection: {
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: "#111827",
    },
    radioGroup: {
        flexDirection: "row",
        gap: 24,
    },
    radioOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#9CA3AF",
        marginRight: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#000000",
    },
    radioText: {
        fontSize: 16,
        color: "#111827",
    },
    dropdownContainer: {
        position: "relative",
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdownText: {
        fontSize: 16,
        color: "#111827",
    },
    dropdownMenu: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        marginTop: 4,
        zIndex: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dropdownItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    dropdownItemLast: {
        borderBottomWidth: 0,
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#111827",
    },
    helpText: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 24,
    },
    photoContainer: {
        borderWidth: 2,
        borderColor: "#D1D5DB",
        borderStyle: "dashed",
        borderRadius: 8,
        padding: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9FAFB",
        minHeight: 300,
    },
    humanFigure: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    figureContainer: {
        width: 128,
        height: 192,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    head: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#9CA3AF",
        marginBottom: 4,
    },
    body: {
        width: 48,
        height: 64,
        borderWidth: 2,
        borderColor: "#9CA3AF",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginBottom: 4,
    },
    arm: {
        position: "absolute",
        width: 24,
        height: 8,
        borderWidth: 2,
        borderColor: "#9CA3AF",
        borderRadius: 12,
        top: 32,
    },
    leftArm: {
        left: -12,
        transform: [{ rotate: "45deg" }],
    },
    rightArm: {
        right: -12,
        transform: [{ rotate: "-45deg" }],
    },
    legs: {
        flexDirection: "row",
        gap: 4,
    },
    leg: {
        width: 20,
        height: 48,
        borderWidth: 2,
        borderColor: "#9CA3AF",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    iconRow: {
        flexDirection: "row",
        gap: 16,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },
    infoSection: {
        marginBottom: 32,
        gap: 12,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#9CA3AF",
        marginTop: 8,
        marginRight: 12,
    },
    infoText: {
        fontSize: 14,
        color: "#6B7280",
        flex: 1,
        lineHeight: 20,
    },
    nextButton: {
        backgroundColor: "#000000",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
    },
    nextButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
    },
})

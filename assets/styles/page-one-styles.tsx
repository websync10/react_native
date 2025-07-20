import {
  StyleSheet
} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 0.3,
    borderColor: "#999",
    width: '100%',
    alignSelf: 'stretch',
  },
  backButton: {
    padding: 10,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: "50%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  progressContainer: {
    top: -6,
    display: "flex",
    flexDirection: "row",
    width: "auto",
    justifyContent: "space-between"
  },
  progressBar: {
    width: '50%',
    height: 15,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    width: '25%',
    height: 15,
    backgroundColor: '#007bff',
  },
  progressText: {
    fontSize: 20,
    color: '#333',
    marginTop: 10,
  },
  content: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "Helvetica",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: "center"
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#555"
  },
  textInput: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 18,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#59C9A5',
  },
  genderText: {
    fontSize: 20,
    color: '#333',
  },
  genderTextSelected: {
    color: '#fff',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    color: '#000',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: "black",
    color: "white",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
  },
  saveButton: {
    width: '100%',
    height: 60,
    backgroundColor: 'black',
    fontSize: 20,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#fff',
  },
  cancelButton: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    fontSize: 20,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 22,
    fontWeight: "normal",
    color: '#999',
  },
});

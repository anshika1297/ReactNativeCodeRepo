import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // ...
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
      },
      heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
      },
      todo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
      },
      todoText: {
        fontSize: 16,
        marginLeft: 10,
        flexGrow: 1,
      },
      completedText: {
        textDecorationLine: 'line-through',
      },
      deleteButton: {
        color: 'red',
        marginLeft: 10,
      },
    editingText: {
      textDecorationLine: 'underline',
    },
    editInput: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginHorizontal: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
    },
  });

  export default styles;
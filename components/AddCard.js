import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { gray, white, pink, greenStrong, greenLight, greenBlue, yellowLight, yellowStrong, blue } from '../utils/colors'
import { addCardToDeck, getDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard, receiveDecks } from '../actions'

function SubmitButton ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}
            style={styles.iosSubmitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddCard extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    changeQuestion = (question) => {
        this.setState({ question })
    }

    changeAnswer = (answer) => {
        this.setState({ answer })
    }

    handleSubmit = () => {

        const { question, answer } = this.state
        const { deck, navigation } = this.props
        console.log(deck, 'UFFFFaaaaa')
        const card = { question: question, answer: answer }


        if(!question) {
            Alert.alert(
                "You didn't enter a question",
                "Please fill in your question"
            )
        } else if (!answer) {
            Alert.alert(
                "You didn't enter the answer",
                "Please fill in the answer"
            )
        } else {
            console.log(deck, card, 'STTAE add card')
            addCardToDeck(card, deck).then(this.props.addCard(card, deck));
            // TODO: navigate to quiz view??
            navigation.goBack()
        }
    }

    render () {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>ADD NEW CARD</Text>
                <Text style={styles.subtitle}>Enter a question</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Question"
                    onChangeText={this.changeQuestion}
                />
                <Text style={styles.subtitle}>Enter the answer</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Answer"
                    onChangeText={this.changeAnswer}
                />
                <SubmitButton onPress={this.handleSubmit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    title: {
        textAlign:'center',
        fontSize: 22,
        padding: 20,
    },
    subtitle: {
        paddingTop: 40,
        paddingBottom: 20,
        fontSize: 18
    },
    iosSubmitBtn: {
        backgroundColor: greenLight,
        padding: 10,
        marginTop: 20,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    input: {
        height: 40,
        borderColor: gray,
        borderRadius: 7,
        borderWidth: 1,
        paddingLeft: 20,
        marginBottom: 10,
        color: gray

    }
})
const mapStateToProps = (state, ownProps) => {
    const { key } = ownProps.navigation.state.params
    return { deck: state[key] }

  }


export default connect(mapStateToProps, {addCard})(AddCard)

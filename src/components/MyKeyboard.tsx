import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";


export default function MyKeboard() {

    const [firstNumber, setFirstNumber] = React.useState("")
    const [secondNumber, setSecondNumber] = React.useState("")
    const [operation, setOperation] = React.useState("")
    const [result, setResult] = React.useState<Number | null>(null)

    const handleNumberPress = (buttonValue: string) => {
        if (firstNumber.length < 10) {
            setFirstNumber(firstNumber + buttonValue)
        }
    };

    const handleOperationPress = (buttonValue: string) => {
        setOperation(buttonValue)
        setSecondNumber(firstNumber)
        setFirstNumber("")
    };

    const clear = () => {
        setFirstNumber("")
        setSecondNumber("")
        setOperation("")
        setResult(null)
    };

    // Logic & mathematical operations 
    const getResult = () => {
        switch (operation) {
            case "+":
                clear()
                setResult(parseInt(secondNumber) + parseInt(firstNumber))
                break;
            case "-":
                clear()
                setResult(parseInt(secondNumber) - parseInt(firstNumber))
                break;
            case "*":
                clear()
                setResult(parseInt(secondNumber) * parseInt(firstNumber))
                break;
            case "/":
                clear()
                setResult(parseInt(secondNumber) / parseInt(firstNumber))
                break;
            default:
                clear()
                setResult(0)
                break;
        }
    };

    return (
        <>
            <View style={Styles.row}>
                <Button title="AC" isGray onPress={clear} />
                <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
                <Button title="%" isGray onPress={() => handleNumberPress("%")} />
                <Button title="÷" isGray onPress={() => handleNumberPress("/")} />
            </View>
            <View style={Styles.row}>
                <Button title="7" onPress={() => handleOperationPress("7")} />
                <Button title="8" onPress={() => handleOperationPress("8")} />
                <Button title="9" onPress={() => handleNumberPress("9")} />
                <Button title="x" isBlue onPress={() => handleNumberPress("*")} />
            </View>
            <View style={Styles.row}>
                <Button title="4" onPress={() => handleOperationPress("4")} />
                <Button title="5" onPress={() => handleOperationPress("5")} />
                <Button title="6" onPress={() => handleNumberPress("6")} />
                <Button title="-" isBlue onPress={() => handleNumberPress("-")} />
            </View>
            <View style={Styles.row}>
                <Button title="1" onPress={() => handleOperationPress("1")} />
                <Button title="2" onPress={() => handleOperationPress("2")} />
                <Button title="3" onPress={() => handleNumberPress("3")} />
                <Button title="+" isBlue onPress={() => handleNumberPress("+")} />
            </View>
            <View style={Styles.row}>
                <Button title="." onPress={() => handleOperationPress(".")} />
                <Button title="0" onPress={() => handleOperationPress("0")} />
                <Button title="⌫" onPress={() => handleNumberPress(firstNumber.slice(0, -1))} />
                <Button title="=" isBlue onPress={() => handleNumberPress("*")} />
            </View>
        </>
    );
};
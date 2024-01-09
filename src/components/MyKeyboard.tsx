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

    // Display numbers types 
    const firstNumberDisplay = () => {
        if (result !== null) {
            return <Text style={result < 99999 ? [Styles.screenFirstNumber, {color: myColors.result}] : [Styles.screenFirstNumber, {fontSize: 50, color: myColors.result}]}>{result?.toString()}</Text>
        }
        if (firstNumber && firstNumber.length < 6) {
            return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>
        }
        if (firstNumber === "") {
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>
        }
        if (firstNumber.length > 5 && firstNumber.length < 8) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
                    {firstNumber}
                </Text>
            );
        }
        if (firstNumber.length > 7) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
                    {firstNumber}
                </Text>
            );
        }
    }

    return (
        <View style={Styles.viewBottom}>
            <View
                style={{
                    height: 120,
                    width: "90%",
                    justifyContent: "flex-end",
                    alignSelf: "center"
                }}
            >
                <Text style={Styles.screenSecondNumber}>{secondNumber}
                <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>{operation}</Text>
                </Text>
            </View>
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
        </View>
    );
};
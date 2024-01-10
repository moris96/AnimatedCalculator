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
                setResult(parseFloat(secondNumber) + parseFloat(firstNumber))
                break;
            case "-":
                clear()
                setResult(parseFloat(secondNumber) - parseFloat(firstNumber))
                break;
            case "*":
                clear()
                setResult(parseFloat(secondNumber) * parseFloat(firstNumber))
                break;
            case "/":
                clear()
                setResult(parseFloat(secondNumber) / parseFloat(firstNumber))
                break;
            case "+/-":
                clear();
                setResult(parseFloat(secondNumber) * -1)
                break;
            case "log":
                clear()
                setResult(Math.log10(parseFloat(firstNumber))) 
                break
            case "ln":
                clear()
                setResult(Math.log(parseFloat(firstNumber)))
                break;
            case "tan":
                clear()
                setResult(Math.tan(parseFloat(firstNumber)))
                break;


            // TO FIX!!!
            case "%": 
                clear()
                setResult(parseFloat(secondNumber) % parseFloat(firstNumber)) 
                break;

            case "pi": 
                clear()
                setResult(Math.PI)
                break;

            case "()": 
                clear()
                setResult(eval(firstNumber))              
                break;



                
            default:
                clear()
                setResult(0)
                break;
        };
    };








    // Display numbers types 
    // const firstNumberDisplay = () => {
    //     if (result !== null) {
    //         return <Text style={+result < 99999 ? [Styles.screenFirstNumber, {color: myColors.result}] : [Styles.screenFirstNumber, {fontSize: 50, color: myColors.result}]}>{result?.toString()}</Text>
    //     }
    //     if (firstNumber && firstNumber.length < 6) {
    //         return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>
    //     }
    //     if (firstNumber === "") {
    //         return <Text style={Styles.screenFirstNumber}>{"0"}</Text>
    //     }
    //     if (firstNumber.length > 5 && firstNumber.length < 8) {
    //         return (
    //             <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
    //                 {firstNumber}
    //             </Text>
    //         );
    //     }
    //     if (firstNumber.length > 7) {
    //         return (
    //             <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
    //                 {firstNumber}
    //             </Text>
    //         );
    //     }
    // };

     // Updated display function to show both numbers on the same line
     const displayNumbers = () => {
        const combinedNumbers = `${secondNumber} ${operation} ${firstNumber}`;
        const maxLength = 12; // Adjust this value based on the space available

        if (result !== null) {
        return (
            <Text style={+result < 99999 ? [Styles.screenFirstNumber, {color: myColors.result}] : [Styles.screenFirstNumber, {fontSize: 50, color: myColors.result}]}>
            {result?.toString()}
            </Text>
        );
        } else if (combinedNumbers.length > maxLength) {
        return (
            <Text style={[Styles.screenFirstNumber, { fontSize: 30 }]}>
            {combinedNumbers.slice(-maxLength)}
            </Text>
        );
        } else {
        return (
            <Text style={Styles.screenFirstNumber}>
            {combinedNumbers}
            </Text>
        );
        }
  };




    
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
                <Text style={Styles.screenSecondNumber}>
                    {displayNumbers()}
                </Text>
                </View>


                {/* <Text style={Styles.screenSecondNumber}>
                    {secondNumber}
                    {displayNumbers()}
                <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View> */}

    <View style={Styles.row}>
        {/* first row */}
        <Button title="AC" isGray onPress={clear} />
        <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
        <Button title="％" isGray onPress={() => handleOperationPress("％")} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
      </View>

      {/* <View style={Styles.row}>
        <Button title="()" isGray onPress={() => handleOperationPress("()")} />
      </View> */}

      <View style={Styles.row}>
        <Button title="log" isGray onPress={() => handleOperationPress("log")} />
        <Button title="ln" isGray onPress={() => handleOperationPress("ln")} />
        <Button title="tan" isGray onPress={() => handleOperationPress("tan")} />
        <Button title="π" isBlue onPress={() => handleOperationPress("pi")} />
      </View>

      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
        <Button title="=" isBlue onPress={() => getResult()} />
      </View>
    </View>
    );
};
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
        if (buttonValue === "π") {
            setFirstNumber(Math.PI.toFixed(5)); // Display 3.14 for pi
        } else if (buttonValue === "sin") {
            setOperation("sin");
            setFirstNumber("");
        } else if (buttonValue === "cos") {
            setOperation("cos");
            setFirstNumber("");
        } else if (firstNumber.length < 10) {
            setFirstNumber(firstNumber + buttonValue);
        }
    };

    // const handleNumberPress = (buttonValue: string) => {
    //     if (buttonValue === "π") {
    //       setFirstNumber(Math.PI.toFixed(5));
    //     } else if (buttonValue === "sin") {
    //       setOperation("sin");
    //       setFirstNumber("");
    //     } else if (buttonValue === "cos") {
    //       setOperation("cos");
    //       setFirstNumber("");
    //     } else if (buttonValue === "(" || buttonValue === ")") {
    //       setFirstNumber((prevNumber) => prevNumber + buttonValue);
    //     } else if (firstNumber.length < 10) {
    //       setFirstNumber((prevNumber) => prevNumber + buttonValue);
    //     }
    //   };






    const handleOperationPress = (buttonValue: string) => {
        setOperation(buttonValue)
        setSecondNumber(firstNumber)
        setFirstNumber("") 
        
        if (buttonValue === "x^2") {
          clear();
          setResult(parseFloat(firstNumber) ** 2);
        }
        if (buttonValue === "x^3") {
            clear()
            setResult(parseFloat(firstNumber) ** 3);
        }
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
                const divideBy = parseFloat(firstNumber) === 0 ? NaN : parseFloat(firstNumber);
                clear();
                setResult(parseFloat(secondNumber) / divideBy);
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
            case "sin":
                if (!isNaN(parseFloat(firstNumber))) {
                    setResult(Math.sin(parseFloat(firstNumber)))
                } else {
                    setResult(NaN)
                }
                break;
            

            case "cos":
                if (!isNaN(parseFloat(firstNumber))) {
                    setResult(Math.cos(parseFloat(firstNumber)))
                } else {
                    setResult(NaN)
                }
                break;
        

            case "%": 
                const num1 = parseFloat(secondNumber);
                const num2 = parseFloat(firstNumber);
                if (num2 !== 0) {
                    clear();
                    setResult(num1 % num2);
                } else {
                    clear();
                    setResult(NaN);
                }
                break;
            case "pi":
                if (firstNumber === "") {
                    setResult(Math.PI);
                } else {
                    setResult(parseFloat(firstNumber) * Math.PI);
                }
                break;




                // FIX THE BLOODY () OPERATION!!!
                // case "(": // Handling opening parenthesis
                //     setFirstNumber((prevNumber) => prevNumber + "(");
                //     break;

                // case ")": // Handling closing parenthesis
                //     setFirstNumber((prevNumber) => prevNumber + ")");
                //     break;





                
            default:
                clear()
                setResult(0)
                break;
        };
    };







    // Display numbers types 
    const displayNumbers = () => {
        const combinedNumbers = `${secondNumber} ${operation} ${firstNumber}`;
        const maxLength = 12; // Adjust this value based on the space available

        if (result !== null) {
            return (
                <Text style={+result < 99999 ? [Styles.screenFirstNumber, {color: myColors.result, fontSize: 40}] : [Styles.screenFirstNumber, {fontSize: 50, color: myColors.result}]}>
                    {result?.toString()}
                </Text>
            );
        } else if (combinedNumbers.length > maxLength) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
                    {combinedNumbers.slice(-maxLength)}
                </Text>
            );
        } else {
            const fontSize = firstNumber === Math.PI.toString() ? 40 : 48; // Default font size
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: fontSize }]}>
                    {combinedNumbers}
                </Text>
            );
        }
    };



    
    return (
        <View style={Styles.viewBottom}>
            <View style={{ height: 120, width: "90%", justifyContent: "flex-end", alignSelf: "center" }}>
                <Text style={Styles.screenSecondNumber}>
                    {displayNumbers()}
                </Text>
            </View>
    <View style={Styles.row}>
        {/* first row */}
        <Button title="AC" isGray onPress={clear} />
        <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
        <Button title="%" isGray onPress={() => handleOperationPress("%")} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
      </View>

      <View style={Styles.row}>
        <Button title="sin" isGray onPress={() => handleNumberPress("sin")} />
        <Button title="cos" isGray onPress={() => handleNumberPress("cos")} />
        {/* <Button title="(" onPress={() => setFirstNumber((prevNumber) => `${prevNumber}(`)} />
        <Button title=")" onPress={() => setFirstNumber((prevNumber) => `${prevNumber})`)} /> */}
        <Button title="x²" isGray onPress={() => handleOperationPress("x^2")} />
        <Button title="x³" isGray onPress={() => handleOperationPress("x^3")} />
      </View>

      <View style={Styles.row}>
        <Button title="log" isGray onPress={() => handleOperationPress("log")} />
        <Button title="ln" isGray onPress={() => handleOperationPress("ln")} />
        <Button title="tan" isGray onPress={() => handleOperationPress("tan")} />
        <Button title="π" isBlue onPress={() => handleNumberPress("π")} />
      </View>

      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="x" isBlue onPress={() => handleOperationPress("*")} />
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
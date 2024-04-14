import React, {useEffect, useState} from "react";
import { Caret } from "../index";
import calculateTextWidth from "../../utils";
import "./styles.css"

interface InputFieldProps {
    hiddenValue?: string;
    isFocused: boolean;
    passwordHidden?: boolean;
    type: "username" | "password"
    value: string;
}

const InputField = (props: InputFieldProps) => {
    const { hiddenValue, isFocused, passwordHidden, type, value } = props

    const [textWidth, setTextWidth] = useState<number>(0)

    useEffect(() => {
        
        const textWidth = calculateTextWidth({textContent: passwordHidden ? "*".repeat(value.length) : value, font: "24px arial"})
        
        setTextWidth(textWidth.width)
    }, [passwordHidden, textWidth, value])

    const defaultText = type === "username" ? "Username" : "Password"

    const inputFocusedStateClassName = isFocused ? "input-focused" : "input-unfocused"

    return (
        <>  
        <div className={`${"input-container"} ${inputFocusedStateClassName}`}>
            <div className="text-container">
                <div className="inner-container">
                    {
                        value.length === 0 ?
                            <p className="default-text">{defaultText}</p>
                        :
                        <p className="default-text"></p>
                    }
                    <p>{passwordHidden ? hiddenValue : value}</p>
                    <div className="carat-container" style={{ position: "relative", left: textWidth }}>
                        {
                        (value.length > 0 && isFocused)  && <Caret />
                        }

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default React.memo(InputField)
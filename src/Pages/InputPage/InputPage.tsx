import { useEffect, useState } from "react"
import  Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css"
import { Button,  Error, InputField, Instructions, ShowHidePasswordbutton } from "../../Components"
import "./styles.css"

enum FocusElements {
    UserName = "username",
    Password = "password", 
    ShowHidePassword = "showhidepassword",
    SubmitButton = "submit-button"
}

export enum ErrorType {
    UserName = "username",
    Password = "password"
}

enum DirectionKeys {
    Up = "ArrowUp",
    Down = "ArrowDown", 
    Left = "ArrowLeft", 
    Right = "ArrowRight"
}

const InputPage = () => {
 
const [userName, setUsername] = useState<string>("")
const [userPassword, setUserPassword] = useState<string>("")
const [focusedElement, setFocusedElement] = useState<FocusElements>(FocusElements.UserName)
const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)
const [hiddenPassword, setHiddenPassword] = useState<string>("")
const [isKeyboardOpen, toggleKeyboardOpen] = useState<boolean>(false)
const [errorState, setErrorState] = useState<boolean>(false)
const [errorType, setErrorType] = useState<ErrorType>()

// handle back press events
const handleBack = () => {
    toggleKeyboardOpen(false)
}

// handle enter events
const handleEnter = () => {
    if (focusedElement !== FocusElements.ShowHidePassword){
         toggleKeyboardOpen(true)
         return 
    }
        return handleShowHidePassword()
    
}

// key handler - needs properly typing, KeyboardEvent/KeyboardEventObject param type not working as expected
const handleKeyEvent = (e: any) => {
    e.preventDefault()
    const directionKeys = [DirectionKeys.Up, DirectionKeys.Down, DirectionKeys.Left, DirectionKeys.Right]
        if (directionKeys.includes(e.key)){
            return handleFocus(e.key)
        } 
        if (e.key === "Enter"){
           return handleEnter()
        }
        if (e.key === "Backspace") {
           return handleBack()
        }
        return
 }


useEffect(() => {
     document.addEventListener("keydown", handleKeyEvent)
    return () => {
    document.removeEventListener("keydown", handleKeyEvent)
}
})


const hideCharacters = () => {
    const lastCharIndex = userPassword.length - 1
    let hiddenPassword
    if (lastCharIndex > -1) {
         hiddenPassword = `${"*".repeat(lastCharIndex)}${userPassword[lastCharIndex]}`
    }
    setHiddenPassword(hiddenPassword ?? "")
}

// handle password hiding
useEffect(() => {
    if (focusedElement === FocusElements.Password){
        // clear error state if active
        if (errorState === true){
            setErrorState(false)
        }
        hideCharacters()
        let timerId: ReturnType<typeof setTimeout>
        if (isPasswordHidden) {
            timerId = setTimeout(() => {
                setHiddenPassword("*".repeat(userPassword.length ?? ""))
            }, 2000)
        }
    return () => {
        clearTimeout(timerId)
    }
}
}, [userPassword])



const handleError = (error: ErrorType) => {
    setErrorState(true)
    setErrorType(error)
}

const checkIsEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(userName)) {
       return handleError(ErrorType.UserName)
    }
    setErrorState(false)
    setFocusedElement(FocusElements.Password)
}

// focus manager
const handleFocus = (key: DirectionKeys) => {
    switch(key) {
        case DirectionKeys.Up:
            const shouldFocusOnUserName = () => focusedElement !== FocusElements.SubmitButton
            if (shouldFocusOnUserName()){
                return setFocusedElement(FocusElements.UserName)
            }
            setFocusedElement(FocusElements.Password)
        break;
        case DirectionKeys.Down:
            if (focusedElement === FocusElements.UserName){
                return checkIsEmail()
            }
            if (userPassword.length > 0) {
               return setFocusedElement(FocusElements.SubmitButton)
            }
            handleError(ErrorType.Password)
        break;
        case DirectionKeys.Right:
            if (focusedElement === FocusElements.UserName) {
                return
            }
            setFocusedElement(FocusElements.ShowHidePassword)
        break;
        case DirectionKeys.Left:
            if (focusedElement !== FocusElements.ShowHidePassword){
                return
            }
            setFocusedElement(FocusElements.Password)
        break;
        default: 
            setFocusedElement(FocusElements.UserName)
    }
}


   const handleInputChange = (button: string) => {

    const fieldStateUpdater = focusedElement === FocusElements.UserName ? setUsername : setUserPassword
    const fieldToUpdate = focusedElement === FocusElements.UserName ? userName : userPassword 
    if (button === "{bksp}") {
         fieldStateUpdater(fieldToUpdate.substring(
            0,
            fieldToUpdate.length - 1
          ));
          return
     }

     // handle username field
     if (focusedElement === FocusElements.UserName) {
        return fieldStateUpdater(`${fieldToUpdate}${button}`)
     }

     if (focusedElement === FocusElements.Password) {
        setUserPassword(`${userPassword}${button}`)
     }
    }

   const handleShowHidePassword = () => {
    setIsPasswordHidden(!isPasswordHidden)
   }

   const onKeyPress = (button: string) => {        
            handleInputChange(button)
    }

    return (
        <div>
            <div className="error-container">
                { errorState && <Error error={errorType}/> }
            </div>
            <div className="input-page-container">
            <h1>INPUT PAGE</h1>
            <div className="input-field-container">
                <InputField value={userName} isFocused={focusedElement === FocusElements.UserName} type="username" key={1}/>
                <div className="password-field-container">
                    <InputField value={userPassword} hiddenValue={hiddenPassword} passwordHidden={isPasswordHidden} isFocused={focusedElement === FocusElements.Password} type="password" key={2}/>
                    <ShowHidePasswordbutton isFocused={focusedElement === FocusElements.ShowHidePassword} isPasswordHidden={isPasswordHidden}/>
                </div>
                <Button isFocused={focusedElement === FocusElements.SubmitButton}/>
            </div>       
            <div className="keyboard-container">
            {
                isKeyboardOpen &&
            <Keyboard
                onKeyPress={onKeyPress}
                layout={{
                    'default': [
                      '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                      '{tab} q w e r t y u i o p [ ] \\',
                      '{lock} a s d f g h j k l ; \' {enter}',
                      '{shift} z x c v b n m , . / {shift}',
                      '.com @ @gmail @yahoo @outlook'
                    ],
                    'shift': [
                      '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
                      '{tab} Q W E R T Y U I O P { } |',
                      '{lock} A S D F G H J K L : " {enter}',
                      '{shift} Z X C V B N M &lt; &gt; ? {shift}',
                      '.com @ @gmail @yahoo @outlook'
                    ]
                  }}
            />
        }
        </div>
            </div>
        <div className="instructions-container">
            <Instructions />
        </div>
        
        </div>
    )
}

export default InputPage
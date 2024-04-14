import "./styles.css"

const Button = (props: { isFocused: boolean }) => {
    const { isFocused } = props

    const inputFocusedStateClassName = isFocused ? "button-focused" : "button-unfocused"

    return (
        <button className={inputFocusedStateClassName} >Submit</button>
    )
}

export default Button
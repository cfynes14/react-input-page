import "./styles.css"

interface ShowHidePasswordButtonProps {
    isFocused: boolean;
    isPasswordHidden: boolean;
}


const ShowHidePasswordbutton = (props: ShowHidePasswordButtonProps) => {
    const { isFocused, isPasswordHidden } = props

    const containerClassName = isFocused ? "show-password-focused" : "show-password-unfocused"

    return (
        <>
            <div id="box-container" className={containerClassName}>
                <div className="image-container">
                    <img alt="show hide button" src={isPasswordHidden ? require("./assets/Hide.png") : require("./assets/Show.png")}/>
            </div>
            </div>
        </>
    )
}

export default ShowHidePasswordbutton
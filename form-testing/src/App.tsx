import './App.css'

function App() {
    return (
        <>
            <form className="fake-form">
                <div className="input-wrapper">
                    <label>Email
                        <input type="email" name="email" />
                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Password
                        <input type="password" name="password"/>
                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Confirm password
                        <input type="password" name="confirm-password"/>
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default App

import './App.css'
import {useState} from "react";

function App() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    return (
        <>
            <form className="fake-form">
                <div className="input-wrapper">
                    <label>Email
                        <input
                            type="email"
                            name="email"
                            onChange={(event) => setFormState({...formState, email: event.target.value})}/>
                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            onChange={(event) => setFormState({...formState, password: event.target.value})}
                        />
                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Confirm password
                        <input
                            type="password"
                            name="confirm-password"
                            onChange={(event) => setFormState({...formState, confirmPassword: event.target.value})}
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default App

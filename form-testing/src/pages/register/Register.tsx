import CreateAccountForm from "../../components/createAccountForm/CreateAccountForm.tsx"
import styles from "./Register.module.css"

const Register = () => {
  return (
    <div className={styles.registerPageContainer}>
      <CreateAccountForm />
    </div>
  )
}

export default Register

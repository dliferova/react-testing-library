import CreateAccountForm from "../../components/form/CreateAccountForm.tsx"
import styles from "./Register.module.css"

const Register = () => {
  return (
    <div className={styles.registerPageContainer}>
      <CreateAccountForm />
    </div>
  )
}

export default Register

import styles from "./Form.module.css"
import { Button, Checkbox, Result, Space, Typography } from "antd"
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik"
import { AntDesignPasswordInput, AntDesignTextInput } from "../input/Input.tsx"
import { registerSchema } from "./validationSchema.ts"
import { useState } from "react"

const { Title } = Typography

interface FormikInitialValues {
  email: string
  password: string
  confirmPassword: string
  privacyPolicy: boolean
}

const CreateAccountForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <>
      {!isSubmitted ? (
        <div className={styles.formContainer}>
          <Space direction="vertical" size="middle">
            <Title level={2}>Create account</Title>
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                privacyPolicy: false,
              }}
              validationSchema={registerSchema}
              onSubmit={(values) => {
                console.log("Form data submitted:", values)
                setIsSubmitted(true)
              }}
            >
              {(props: FormikProps<FormikInitialValues>) => (
                <Form>
                  <Space direction="vertical" size="middle">
                    <Field
                      id="email"
                      name="email"
                      placeholder="email"
                      value={props.values.email}
                      onChange={props.handleChange}
                      component={AntDesignTextInput}
                      status={
                        props.errors.email && props.touched.email ? "error" : ""
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={styles.errorMessage}
                    />
                    <Field
                      id="password"
                      name="password"
                      placeholder="password"
                      autoComplete="new-password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      component={AntDesignPasswordInput}
                      status={
                        props.errors.password && props.touched.password
                          ? "error"
                          : ""
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={styles.errorMessage}
                    />
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder="confirm password"
                      value={props.values.confirmPassword}
                      onChange={props.handleChange}
                      component={AntDesignPasswordInput}
                      status={
                        props.errors.confirmPassword &&
                        props.touched.confirmPassword
                          ? "error"
                          : ""
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className={styles.errorMessage}
                    />
                    <div className="flex-row flex-row--gap-s">
                      <label>
                        <Field
                          as={Checkbox}
                          id="privacyPolicy"
                          type="checkbox"
                          name="privacyPolicy"
                          className="mr-s"
                        />
                        I agree to the <a href=""> privacy policy</a>
                      </label>
                    </div>
                    <ErrorMessage
                      name="privacyPolicy"
                      component="div"
                      className={styles.errorMessage}
                    />
                    <Button className="w-fill" type="primary" htmlType="submit">
                      Create account
                    </Button>
                  </Space>
                </Form>
              )}
            </Formik>
          </Space>
        </div>
      ) : (
        <div className={styles.successNotificationContainer}>
          <div className={styles.successContent}>
            <Result
              title="Account was successfully created"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CreateAccountForm

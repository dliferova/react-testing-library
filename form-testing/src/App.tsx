import './App.css'
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {Button, Checkbox, Input, Space, Typography} from 'antd';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';

const {Title} = Typography;

interface FormikInitialValues {
    email: string,
    password: string,
    confirmPassword: string,
    privacyPolicy: boolean
}

const AntDesignTextInput = (field: { field: any }) => {
    return (
        <>
            <Input
                size="large"
                type="email"
                {...field}
            />
        </>
    )
}

const AntDesignPasswordInput = (field: { field: any }) => {
    return <Input.Password
        size="large"
        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
        onChange={(e) => field.field.onChange(e)}
        {...field}
    />
}

const registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'The password must be longer than 6 symbols'),
    confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password'), ''],
        'Passwords must match')
        .min(6, 'The confirm password must be longer than 6 symbols'),
    privacyPolicy: Yup.boolean().oneOf([true], 'Please agree to the privacy policy'),
})

const App = () => {
    return (
        <div className="form-wrapper">
            <Space direction="vertical" size="middle">
                <Title level={2}>Create account</Title>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        privacyPolicy: false
                    }}
                    validationSchema={registerSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log("Form data:", values);
                        setSubmitting(false)
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
                                    status={props.errors.email && props.touched.email ? "error" : ""}
                                />
                                <ErrorMessage name="email" component="div" className={`error-message ${props.errors.email && props.touched.email ? 'error-message--shown' : ''}`} />
                                <Field
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    value={props.values.password}
                                    onChange={props.handleChange}
                                    component={AntDesignPasswordInput}
                                    status={props.errors.password && props.touched.password ? "error" : ""}
                                />
                                <ErrorMessage name="password" component="div" className="error-message"/>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="confirm password"
                                    value={props.values.confirmPassword}
                                    onChange={props.handleChange}
                                    component={AntDesignPasswordInput}
                                    status={props.errors.confirmPassword && props.touched.confirmPassword ? "error" : ""}
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="error-message"/>
                                <div className="flex-row flex-row--gap-s">
                                    <label>
                                        I agree to the <a href=""> privacy policy</a>
                                        <Field
                                            id="privacyPolicy"
                                            type="checkbox"
                                            name="privacyPolicy"
                                            as={Checkbox}
                                        />
                                    </label>
                                </div>
                                <ErrorMessage name="privacyPolicy" component="div" className="error-message"/>
                                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                    Create account
                                </Button>
                            </Space>
                        </Form>
                    )}
                </Formik>
            </Space>
        </div>
    )
}

export default App

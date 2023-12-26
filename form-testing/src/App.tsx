import './App.css'
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {Button, Input, Space} from 'antd';
import {Field, Form, Formik, FormikProps} from "formik";

interface FormikInitialValues {
    email: string,
    password: string,
    confirmPassword: string,
}

const AntDesignTextInput = (field: { field: any }) => {
    return (
        <>
            <Input
                size="large"
                placeholder="email"
                type="email"
                {...field}
            />
        </>
    )
}

const AntDesignPasswordInput = (field: { field: any }) => {
    return <Input.Password
        size="large"
        placeholder="password"
        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
        {...field}
    />
}

const App = () => {
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={(values) => console.log("Form data:", values)}
            >
                {(props: FormikProps<FormikInitialValues>) => (
                    <Form>
                        <Space direction="vertical" size="middle">
                            <Field
                                id="email"
                                name="email"
                                value={props.values.email}
                                onChange={props.handleChange}
                                component={AntDesignTextInput}
                            />
                            <Field
                                id="password"
                                name="password"
                                value={props.values.password}
                                onChange={props.handleChange}
                                component={AntDesignPasswordInput}
                            />
                            <Field
                                id="confirmPassword"
                                name="confirmPassword"
                                value={props.values.confirmPassword}
                                onChange={props.handleChange}
                                component={AntDesignPasswordInput}
                            />
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Space>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default App

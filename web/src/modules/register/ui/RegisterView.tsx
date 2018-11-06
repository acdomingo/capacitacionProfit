import * as React from 'react';
import { Button, Input, Icon } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { withFormik, FormikErrors, FormikValues, FormikProps } from "formik";
import * as yup from 'yup';


interface IFormValues {
    email: string,
    password: string
}

interface IProps {
    submit: (values: IFormValues) => Promise<FormikErrors<FormikValues> | null>
}

class C extends React.PureComponent<FormikProps<IFormValues> & IProps> {

    render() {
        const { values, handleChange, handleSubmit, handleBlur, touched, errors } = this.props;

        console.log(errors);

        return (
            <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
                <div style={{ width: 500, margin: 'auto' }}>
                    <FormItem help={touched.email && errors.email ? errors.email : ''} validateStatus = {touched.email && errors.email ? 'error' : undefined }>
                        <Input name='email'
                            prefix={<Icon type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                    </FormItem>
                    <FormItem help={touched.password && errors.password ? errors.password : ''} validateStatus = {touched.password && errors.password ? 'error' : undefined }>
                        <Input name='password'
                            prefix={<Icon type="lock"
                                style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                    </FormItem>
                    <FormItem>
                        <a className="login-form-forgot" href="">Forgot password</a>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                </Button>
                    </FormItem>
                    <FormItem>
                        Or <a href="">Login now!</a>
                    </FormItem>
                </div>
            </form>
        );
    }
}

const emailNotLongEnough = "email must be at least 3 characters";
const passwordNotLongEnough = "password must be at least 3 characters";
const invalidEmail = "email must be a valid email";


const validationSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, emailNotLongEnough)
        .max(255)
        .email(invalidEmail)
        .required(),
    password: yup
        .string()
        .min(3, passwordNotLongEnough)
        .max(255)
        .required(),
});

export const RegisterView = withFormik<IProps, IFormValues>({
    validationSchema,
    validateOnChange: false,
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    handleSubmit: async (values, { props, setErrors }) => {
        const errors = await props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    }
})(C);

import * as React from 'react';
import { Button, Input, Icon } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { withFormik, FormikErrors, FormikValues, FormikProps } from "formik";


interface IFormValues {
    email: string,
    password: string
}

interface IProps {
    submit: (values: IFormValues) => Promise<FormikErrors<FormikValues> | null>
}

class C extends React.PureComponent <FormikProps <IFormValues> & IProps> {

    render() {
        const {handleChange, handleSubmit, handleBlur} = this.props;

        return (
            <div style={{display: 'flex'}}>
                <div style={{width: 500, margin: 'auto'}}>
                    <FormItem>
                        <Input name='email' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    </FormItem>
                    <FormItem>
                        <Input name='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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
            </div>
        );
    }
}

export const RegisterView = withFormik <IProps, IFormValues>({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    handleSubmit: async (values, {props, setErrors}) => {
        const errors = await props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    }
})(C);

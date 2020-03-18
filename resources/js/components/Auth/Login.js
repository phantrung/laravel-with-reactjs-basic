import React from 'react';
import {Paper, Typography,Button} from "@material-ui/core";
import FormField from "../Form/FormField";
import {Form} from "../Form/Form";
import useForm from "../hooks/useForm";
import Http from '../Http'
const Login = (props) => {
    const {history} = props
    const {form,handleChange} = useForm({email : '',password : ''})
    const handleSubmit = () => {
        let uri = '/api/auth/login';
        Http.post(uri, form).then((response) => {
            console.log(`===========> response`,response)
            if (response.access_token) {
                localStorage.setItem('access_token',response.access_token)
                Http.defaults.headers.common['Authorization'] = 'Bearer ' + response.access_token;
                history.push('/')
            }
        })
            .catch(error => {
                console.log(`===========> error`,error)
                alert('Login Failed !')
            })
    }

    return (
        <Paper className="p-4">
            <Typography variant="h6" className="flex-grow">
                Login Form
            </Typography>
            <Form
                handleSubmit={handleSubmit}
                fields={
                    <div>
                        <FormField
                            label="Email"
                            FieldProps={{
                                type : 'email',
                                name : 'email',
                                value : form.email,
                                onChange : handleChange
                            }}
                        />
                        <FormField
                            label="Password"
                            FieldProps={{
                                type : 'password',
                                name : 'password',
                                value : form.password,
                                onChange : handleChange
                            }}
                        />
                        <div>
                            <Button type="submit" className="mr-4" variant="contained" color="secondary">
                                Submit
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => history.push('/register')}>
                                Register
                            </Button>
                        </div>
                    </div>
                }
            />
        </Paper>
    )
}

export default Login;

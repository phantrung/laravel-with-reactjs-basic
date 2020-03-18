import React from 'react';
import {Button, Paper, Typography} from "@material-ui/core";
import {Form} from "../Form/Form";
import FormField from "../Form/FormField";
import useForm from "../hooks/useForm";
import Http from '../Http'
const Register = (props) => {
    const {history} = props
    const {form,handleChange} = useForm({
        name : '',
        password : '',
        email : '',
        confirm_password : ''
    })
    const handleSubmit = () => {
        if(form.password  === form.confirm_password){
            let uri = 'api/user/register'
            Http.post(uri,form)
                .then(res => {
                    if (res.success) {
                        alert(res.message)
                        history.push('/login')
                    }
                })
                .catch(error => console.log(error))
        }else{
            alert("Password not matched")
        }
    }

    return (
        <Paper className="p-4">
            <Typography variant="h6" className="flex-grow">
                Register Form
            </Typography>
            <Form
                handleSubmit={handleSubmit}
                fields={
                    <div>
                        <FormField
                            label="Username"
                            required
                            FieldProps={{
                                name : 'name',
                                value : form.name,
                                onChange : handleChange
                            }}
                        />
                        <FormField
                            label="Email"
                            required
                            FieldProps={{
                                type : 'email',
                                name : 'email',
                                value : form.email,
                                onChange : handleChange
                            }}
                        />
                        <FormField
                            label="Password"
                            required
                            FieldProps={{
                                type : 'password',
                                name : 'password',
                                value : form.password,
                                onChange : handleChange
                            }}
                        />
                        <FormField
                            label="Confirm Password"
                            required
                            FieldProps={{
                                type : 'password',
                                name : 'confirm_password',
                                value : form.confirm_password,
                                onChange : handleChange
                            }}
                        />
                        <div>
                            <Button type="submit" className="mr-4" variant="contained" color="secondary">
                                Submit
                            </Button>
                        </div>
                    </div>
                }
            />
        </Paper>
    )
}

export default Register;

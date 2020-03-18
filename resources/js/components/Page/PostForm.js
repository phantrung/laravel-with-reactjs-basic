import React, {useEffect} from 'react';
import FormField from "../Form/FormField";
import useForm from "../hooks/useForm";
import {Form} from "../Form/Form";
import PostModel from "../Model/Post";

const PostForm = (props) => {
    const {data,setOpen,getCollection} = props
    let initState = {
        title : '',
        content : '',
        user_id : 2
    }
    const {form,handleChange,setForm} = useForm(initState)
    useEffect(() => {
        if(data instanceof Object && data.hasOwnProperty('id')){
            setForm(data)
        }
    },[data])

    const handleSubmit = () => {
        PostModel.save(form)
            .then(res => {
                getCollection()
                setOpen(false)
            })
            .catch(error => {
                console.log(error)
                alert('Something went wrong !')
            })
    }

    return (
        <Form
            handleSubmit={handleSubmit}
            btnSubmitId={`postForm`}
            fields={
                <div>
                    <FormField
                        label={`Title`}
                        required
                        FieldProps={{
                            name : 'title',
                            value : form.title,
                            onChange : handleChange
                        }}
                    />
                    <FormField
                        label={`Content`}
                        type="textarea"
                        FieldProps={{
                            name : 'content',
                            value : form.content,
                            onChange : handleChange
                        }}
                    />
                </div>
            }
        />
    )
}

export default React.memo(PostForm);

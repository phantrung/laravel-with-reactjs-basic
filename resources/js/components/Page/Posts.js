import React, {useEffect, useState} from 'react';
import PostModel from "../Model/Post";
import {Paper, Typography,Button} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogPopup from "./DialogPopup";
import PostForm from "./PostForm";

const Posts = (props) => {

    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(true)
    const [open,setOpen] = useState(false)
    const [item,setItem] = useState(null)
    const getCollection = () => {
        PostModel.getList()
            .then(res => {
                console.log(res)
                setData(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        getCollection()
    },[])

    const renderRow = () => {
        return data.map(function(object, i){
            return (
                <tr key={i}>
                    <td>
                        { object.id }
                    </td>
                    <td>
                        { object.title }
                    </td>
                    <td>
                        { object.content }
                    </td>
                    <td>
                        <Button className="normal-case mr-2"
                                color="primary"
                                onClick={() => {
                                    setOpen(true)
                                    setItem(object)
                                }}
                                variant="contained">
                            Edit
                        </Button>
                        <Button className="normal-case"
                                onClick={() => handleDelete(object.id)}
                                color="secondary" variant="contained">
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        })
    }

    const handleDelete = id => {
        let confirm = window.confirm('Do you want to delete item ?')
        if(confirm){
            PostModel.deleteWithPath(id)
                .then(res => {
                    console.log(res)
                    getCollection()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <Paper className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <Typography variant="h6" className="flex-grow">
                    All Posts
                </Typography>
                <div>
                    <Button variant="contained" onClick={() => {
                        setOpen(true)
                        setItem(null)
                    }}>
                        Add New
                    </Button>
                </div>
            </div>
            {loading ? <div className="text-center"><CircularProgress className="mt-4"/></div> : (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td width={200}>Post Title</td>
                        <td>Content</td>
                        <td width="200px">Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    { renderRow() }
                    </tbody>
                </table>
            )}
            <DialogPopup
                open={open}
                handleClose={() => setOpen(false)}
                dialogTitle={
                    item ? 'Edit : ' + item.title : 'Add New'
                }
                dialogContent={
                    open ? <PostForm data={item} setOpen={setOpen} getCollection={getCollection}/> : null
                }
                dialogAction={
                    <div>
                        <Button className="normal-case mr-2"
                                color="primary"
                                onClick={() => {
                                    document.getElementById('postForm').click()
                                }}
                                variant="contained">
                            Submit
                        </Button>
                        <Button className="normal-case" variant="contained" onClick={()=>setOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                }
            />
        </Paper>
    )
}

export default Posts;

import React, {useEffect, useState} from 'react';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import CloudUpload from '@material-ui/icons/CloudUpload';
import {DropzoneArea} from 'material-ui-dropzone'
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
        float: "right"
    },
    buttonGroup: {
        width: '100%',
        justifyContent: 'center'
    },
    root: {
        background: '#8b0000'
    }
}));

export default function DropZone() {
    const classes = useStyles();
    const [key, setKey] = useState(0);
    const [fileData, setFileData] = React.useState({
        files: null
    });
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    });
    const { vertical, horizontal, open } = state;

    const reset = () => {
        setFileData({ files: []});
        setKey(key+1);
    };

    const handleChange = (files) => {
        setFileData({
            files: files
        });
        console.log(files);
    };

    const uploadFiles = () => {
        if (fileData.files === null || fileData.files.length === 0) {
            return;
        }
        console.log(fileData.files[0])
        var formData = new FormData();
        formData.append('file', fileData.files[0]);

        axios.post('https://localhost:5001/project/uploadProjects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((result) => {
            if (result.data.error !== "") {
                console.log(result.data.error)
            }
            reset();
            console.log(fileData.files)
        }).catch((error) => {
            if(error.response.data){
                console.log(error.response.data);
                var newState = { vertical: 'bottom', horizontal: 'center'};
                setState({ open: true, ...newState });
            }
        });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (<div >
            <DropzoneArea key={key} className="someClass"
                          onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                          acceptedFiles={['application/json']}
                          filesLimit={1}
                          showFileNames={true}
                          useChipsForPreview={false}
                          dropzoneText={"Drag and drop your JSON-Project-File here or click for File-Explorer"}
                          onChange={handleChange.bind(this)}/>
            <ButtonGroup className={classes.buttonGroup} disableElevation variant="outlined" size="small"
                         color="inherit">
                <Button onClick={uploadFiles} startIcon={<CloudUpload/>} className={classes.button}>Upload</Button>
            </ButtonGroup>
            <Snackbar ContentProps={{ classes: { root: classes.root }}}
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={6000}
                open={open}
                onClose={handleClose}
                message="Fehler beim Upload"
                key={vertical + horizontal}
            >
            </Snackbar>
        </div>
    );
}

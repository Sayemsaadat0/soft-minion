import React, { useCallback, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { MuiModalTransition } from '../MuiModalTransition'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'; import { Button } from '@mui/material';
;


type DeleteActionProps = {
    handleDeleteSubmit: Function;
    isLoading?: boolean;
};

const DeleteAction: React.FC<DeleteActionProps> = ({
    handleDeleteSubmit,
    isLoading,
}) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleDelete = useCallback(async () => {
        try {
            await handleDeleteSubmit()
            setOpen(false);
        } catch (error) {

        }
    }, [handleDeleteSubmit])

    return (
        <div>
            <div className='cursor-pointer bg-error_1/30 text-error_1 p-0.5' onClick={handleClickOpen}>
                <DeleteOutlineOutlinedIcon />
            </div>
            <Dialog
                open={open}
                TransitionComponent={MuiModalTransition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent className='min-w-40 space-y-5'>
                    <div className='flex items-center justify-center text-error_1'>
                        <DeleteOutlineOutlinedIcon style={{ fontSize: '120px' }} />
                    </div>
                    <div className='text-center text-2xl leading-6'>
                        Are You sure? <br />
                        <span className='font-normal text-base'>This Action Cant be undone</span>
                    </div>
                    <div className='flex items-center justify-center gap-5'>
                        <Button onClick={() => setOpen(false)} color="error" variant="contained">Cancel</Button>
                        <Button onClick={handleDelete} variant="outlined" color="error" startIcon={<DeleteOutlineOutlinedIcon />}>
                            {
                                isLoading ? 'Deleting..' : 'Delete'
                            }
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DeleteAction
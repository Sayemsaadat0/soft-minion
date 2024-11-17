import { tastDataType } from '@/model/task.type';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Typography } from '@mui/material';



const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});




// 
type TaskFormType = {
    instance?: tastDataType;
    handleDataSubmit: Function;
};

const TaskForm: React.FC<TaskFormType> = ({ instance, handleDataSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<tastDataType>({
        defaultValues: {
            task_name: instance?.task_name || '',
            priority: instance?.priority || 'low',
            status: instance?.status || 'pending',
            created_at: instance?.created_at || new Date(),
        },
    });

    const onSubmit: SubmitHandler<tastDataType> = async (data) => {
        try {
            let form_data = new FormData();
            form_data.append('task_name', data.task_name);
            form_data.append('priority', data.priority);
            form_data.append('status', data.status);
            form_data.append('created_at', data.created_at ? data.created_at.toISOString() : '');
            if (instance) {
                await handleDataSubmit(form_data);
                console.log('Edited Data Successfull')
            } else {
                await handleDataSubmit(data)
                console.log('Data Successfully Addedd')
            }
        } catch (err: any) {
            console.log(err)
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <div className='cursor-pointer' onClick={handleClickOpen}>
                Add Task
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Creat New Task"}</DialogTitle>
                <DialogContent className='min-w-40'>
                    {/* onSubmit={handleSubmit((d) => { onSubmit(d); console.log(d) })} */}
                    <form onSubmit={handleSubmit((d) => { onSubmit(d); console.log(d) })} className="w-full space-y-3">
                        <div className='space-y-1'>
                            <Typography variant='subtitle1'>Task Name</Typography>
                            <input placeholder='Enter Task Name' className='input_box_style'
                                {...register("task_name", { required: true })}
                                aria-invalid={errors.task_name ? "true" : "false"}
                            />
                            {errors.task_name?.type === "required" && (
                                <p role="alert" className='text-error_1 py-1'>First name is required</p>
                            )}
                        </div>
                        <div className='space-y-1'>
                            <Typography variant='subtitle1'>Priority Level</Typography>
                            <select className='input_box_style' {...register("priority")}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            {errors.priority?.type === "required" && (
                                <p role="alert">First name is required</p>
                            )}
                        </div>
                        <div className='space-y-1'>
                            <Typography variant='subtitle1'>Status</Typography>
                            <select className='input_box_style' {...register("status")}>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status?.type === "required" && (
                                <p role="alert">First name is required</p>
                            )}
                        </div>
                        <div className="border-t dark:border-t-oc-black-200 py-5 mt-10">
                            <button disabled={isSubmitting} className='disabled:bg-black' type='submit'>
                                {isSubmitting ? 'Submitting' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>

    );
};

export default TaskForm;

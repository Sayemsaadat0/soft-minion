'use client'
import { tastDataType } from '@/model/task.type';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Typography } from '@mui/material';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { MuiModalTransition } from '@/components/core/MuiModalTransition';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2'



const schema = z.object({
    task_name: z.string().min(1, { message: 'Task name is required.' }),
    priority: z.enum(['high', 'medium', 'low'], { required_error: 'Priority is required.' }),
    status: z.enum(['pending', 'completed'], { required_error: 'Status is required.' }),
    created_at: z.date({ required_error: 'Creation date is required.' }),
});


type FormData = z.infer<typeof schema>;

// 
type TaskFormType = {
    instance?: tastDataType;
    handleDataSubmit: Function;
};


const TaskForm: React.FC<TaskFormType> = ({ instance, handleDataSubmit }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            task_name: instance?.task_name || '',
            priority: instance?.priority || 'low',
            status: instance?.status || 'pending',
            created_at: instance?.created_at || new Date(),
        },
    });
    const onSubmit: SubmitHandler<tastDataType> = async (data) => {
        try {
            const formData = {
                task_name: data.task_name,
                priority: data.priority,
                status: data.status,
                created_at: data.created_at ? data.created_at.toISOString() : ''
            };

            if (instance) {
                await handleDataSubmit(formData); 
                reset();
                setOpen(false);
                Swal.fire({
                    icon: "success",
                    title: "Task Edited..",
                });
            } else {
                await handleDataSubmit(formData); 
                reset();
                setOpen(false);
                Swal.fire({
                    icon: "success",
                    title: "Task Created Successfully!",
                });
            }
        } catch (err: any) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };



    return (
        <React.Fragment>
            <div className='cursor-pointer' onClick={handleClickOpen}>
                {
                    instance ? <div className='bg-success_1/40  p-0.5 '> <EditNoteOutlinedIcon /> </div> : <div className='border p-2 text-sm md:text-base lg:py-3 lg:px-4 rounded-[10px] bg-primary_color hover:bg-warning_1 transition-all '> Create New Task</div>
                }

            </div>
            <Dialog
                open={open}
                TransitionComponent={MuiModalTransition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Creat New Task"}</DialogTitle>
                <DialogContent className='min-w-40'>
                    <form onSubmit={handleSubmit((d) => { onSubmit(d); console.log(d) })} className="w-full space-y-3">
                        <div className='space-y-1'>
                            <Typography variant='subtitle1'>Task Name</Typography>
                            <input placeholder='Enter Task Name' className='input_box_style'
                                {...register("task_name", { required: true })}
                                aria-invalid={errors.task_name ? "true" : "false"}
                            />
                            {errors.task_name && (
                                <p role="alert" className="text-error_1 py-1">
                                    {errors.task_name.message}
                                </p>
                            )}
                        </div>
                        <div className='space-y-1'>
                            <Typography variant='subtitle1'>Priority Level</Typography>
                            <select className='input_box_style' {...register("priority")}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            {errors.priority && (
                                <p role="alert" className="text-error_1 py-1">
                                    {errors.priority.message}
                                </p>
                            )}
                        </div>
                        <div className='space-y-1'>
                            <Typography variant='subtitle1'>Status</Typography>
                            <select className='input_box_style' {...register("status")}>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && (
                                <p role="alert" className="text-error_1 py-1">
                                    {errors.status.message}
                                </p>
                            )}

                        </div>
                        <div className="flex justify-end">
                            <Button type='submit' disabled={isSubmitting} color="success" variant="contained">
                                {isSubmitting ? 'Submitting' : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>

    );
};

export default TaskForm;

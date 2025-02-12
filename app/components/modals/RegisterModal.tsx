'use client'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback,useState } from 'react';
import{
    FieldValues,SubmitHandler,useForm
} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../input/Input';
import toast from 'react-hot-toast';
import Button from '../Button';

const RegisterModal=()=>{
    const registerModal = useRegisterModal();
    const [isLoading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } =useForm<FieldValues>({
       defaultValues:{
        name:'',
        email:'',
        Password:'',
       } 
    });
    const onSubmit : SubmitHandler<FieldValues> =(data)=>{
        setLoading(true);
        axios.post('/api/register',data)
        .then(()=>{
            registerModal.onClose();
        })
        .catch((error)=>{
            toast.error('something went wrong');
    })
    .finally(()=>{
        setLoading(false);
    })}
const bodyContent = (
    <div className='flex flex-col gap-4'>

<Heading title='Welcome To Mewael' subtitle='create an account' />
<Input 
id='email'
 label='Email'
 disabled={isLoading} 

register={register}
 errors={errors} 
 required
 />
 <Input 
id='name'
 label='Name'
 disabled={isLoading} 
register={register}
 errors={errors} 
 required
 />
 <Input 
id='password'
 label='Password'
 type='password'
 disabled={isLoading} 

register={register}
 errors={errors} 
 required
 />
    </div>
);
const footerContent =(
<div className='flex flex-col gap-4 mt-3'>
    <hr />
    <Button outline label='Continue With Google' icon={FcGoogle} onClick={()=>{}} />
    <Button outline label='Continue With GitHub' icon={AiFillGithub} onClick={()=>{}} />

<div className='text-neutral-500 text-center mt-4 font-light'>
    <div className='justify-center flex flex-row items-center gap-2'>
        <div>Already have an account</div>
        <div className='text-neutral-500 cursor-pointer
        hover:underline
        
        ' onClick={registerModal.onClose}>Log In</div>
    </div>

</div>
</div>
)


    return (

<Modal disabled={isLoading}
 isOpen={registerModal.isOpen}
  actionLabel='Continue'
   onClose={registerModal.onClose} 
   onSubmit={handleSubmit(onSubmit)} 
   title='Register'
   body={bodyContent}
   footer={footerContent}
   />

    );
    
}
export default RegisterModal;

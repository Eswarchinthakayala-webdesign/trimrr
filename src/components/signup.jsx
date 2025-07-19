import React, { useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {BeatLoader} from "react-spinners";
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import Error from './error';
import * as Yup from "yup";
import useFetch from '../hooks/use-fetch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '../context';
import { signup } from '../db/apiAuth';

const Signup = () => {
    const [errors,setErrors]=useState([])
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        profilepic:null
    })
    const navigate=useNavigate()
    let [searchParams]=useSearchParams()
    const longLink=searchParams.get("createNew")
    const handleInputChange=(e)=>
    {
        const {name,value,files}=e.target
        setFormData((prevState)=>({
            ...prevState,
            [name]:files?files[0]:value,
        }))
    }
     const {data,error,loading,fn:fnSignup}=useFetch(signup,formData)
     const {fetchUser}=UrlState()
     useEffect(()=>
    {
        if(error==null && data)
        {
            navigate(`/dashboard?${longLink?`createNew=${longLink}`:""}`)
            fetchUser()
        }
    },[error,loading])
    const handleSignup=async()=>
    {
         setErrors([])
         try{
            const schema=Yup.object().shape({
                name:Yup.string().required("Name is required"),
                email:Yup.string().email("Invalid Email").required("Email is Required"),
                password:Yup.string().min(6,"Password must be at least 6 characters").required("Password is Required"),
                profilepic:Yup.mixed().required("Profile picture is required"),
                
            })
            await schema.validate(formData,{abortEarly:false})
            //api call
            await fnSignup()
         }catch(e){
             const newErrors={};
             e?.inner?.forEach((err)=>
            {
                newErrors[err.path]=err.message
            })
            setErrors(newErrors)
         }
    }
  return (
   <Card>
  <CardHeader>
    <CardTitle>Singup</CardTitle>
    <CardDescription>Create a new account if you haven&rsquo;t already</CardDescription>
    {/* <CardAction>Card Action</CardAction> */}
   {error &&  <Error message={error.message}/>}
  </CardHeader>
  <CardContent className="space-y-2">
     <div className='space-y-1'>
        <Input name="name" type="text" placeholder="Enter Name" onChange={handleInputChange}/>
        {errors.name && <Error message={errors.name}/>}
    </div>
    
    <div className='space-y-1'>
        <Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange}/>
            
     {errors.email && <Error message={errors.email}/>}
    </div>
   
     <div className='space-y-1'>
        <Input name="password" type="password" placeholder="Enter Password" onChange={handleInputChange}/>
        {errors.password && <Error message={errors.password}/>}
    </div>
    
     <div className='space-y-1'>
        <Input name="profilepic"
         type="file"
         accept="image/*"
         onChange={handleInputChange}/>
       {errors.profilepic && <Error message={errors.profilepic}/>}
    </div>
     

    
  </CardContent>
    <CardFooter>
     <Button onClick={handleSignup}>
    {loading?<BeatLoader size={10} color="#36d7b7"/>:"Create Account"}
   </Button>
  </CardFooter>
</Card>
  )
}

export default Signup
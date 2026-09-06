import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, /*SubmitHandler*/ } from "react-hook-form";
import { toast, Toaster } from 'sonner'
import { namedColors } from './namedColors.js'
import { useState } from 'react'

const formSchema = z.object({
    name: z.string().regex(/^([^0-9]*)$/, { message: "Can't include numbers"}).min(1, "Name is required").max(15, "Max 15 characters"),
    message: z.string().min(1, "Message is required").max(25, "Max 25 characters"),
    color: z.string(),
    email: z.string().email({message: "This is not a valid email"}).optional()
})

export function FormPage() {

    const [colorTemplate, setColorTemplate] = useState(false)
    const [previewTemplate, setPreviewTemplate] = useState(false)
    const [emailTemplate, setEmailTemplate] = useState(false)
    const [emailBooleanTemplate, setEmailBooleanTemplate] = useState(false)
    const [textBlur, setTextBlur] = useState(false)
    

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid, isSubmitSuccessful}
    } = useForm({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (data) => {
        const color = data.color
        if(!namedColors.includes(color.toLowerCase())) {
            setError("root", {
                message: "Sorry, this color isn't available at this moment"
            });
            return;
        }
        
        try {
            const URL = '/api/users'
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const fetchedData = await response.json()

            if(!response.ok) {
                const errorMessage = fetchedData.error || 'Internal server error \n 500'
                setError("root", {
                    message: errorMessage
                })
                return;
            }
            console.log(fetchedData.message)
            toast.success('Your message has been submitted!')
        } catch (err) {
            setError("root", {
                message: "Network error. Please check your connection or try again later."
            })
        }
    }

    const variants = {
        on: {opacity: 1, scale: 1},
        off: {opacity: 0, scale: 0},
        visible: {opacity: 1},
        emailBooleanYes: {scale: 1.2},
        emailBooleanNo: {scale: 1.2},
        emailBoolean: {scale: 1},
        blur: {filter: "blur(10px)"},
        noBlur: {filter: "blur(0px)"},
    }

    function colorSchema() {
        setColorTemplate(!colorTemplate)
        if(previewTemplate) {
            setPreviewTemplate(!previewTemplate)
        }
        if(emailTemplate) {
            setEmailTemplate(!emailTemplate)
        }
        if(!colorTemplate) {
            setTextBlur(true)
        } else {
            setTextBlur(false)
        }  
    }

    function previewSchema() {
        setPreviewTemplate(!previewTemplate)
        if(emailTemplate) {
            setEmailTemplate(!emailTemplate)
        }
        if(colorTemplate) {
            setColorTemplate(!colorTemplate)
        }
        if(!previewTemplate) {
            setTextBlur(true)
        } else {
            setTextBlur(false)
        }  
    }

    function emailSchema() {
        setEmailTemplate(!emailTemplate)
        if(previewTemplate) {
            setPreviewTemplate(!previewTemplate)
        }
        if(colorTemplate) {
            setColorTemplate(!colorTemplate)
        }
        if(!emailTemplate) {
            setTextBlur(true)
        } else {
            setTextBlur(false)
        }  
    }

    function emailBooleanOnClick() {
        setEmailBooleanTemplate(!emailBooleanTemplate)
    }

    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center" initial={{scale: 0, y: -20}} animate={{scale: 1, y: 0}} transition={{duration: .1}}>
            <Toaster position="top-right" toastOptions={{style: {background: 'green', color: 'white'}}} />
            <motion.div className="relative h-[90%] w-[45%] bg-slate-950/20 flex flex-col justify-center items-center gap-5" initial={{scale: 0, y: -30}} animate={{scale: 1}} transition={{duration: .3}}>
            <motion.h1 className="text-white font-semibold text-[45px]" variants={variants} initial={{filter: "blur(0px)"}} animate={textBlur ? 'blur' : 'noBlur'}>Create a Message</motion.h1>
            <motion.p className="w-[55%] wrap-break-word text-slate-300/90 font-semibold text-[14px]" variants={variants} initial={{filter: "blur(0px)"}} animate={textBlur ? 'blur' : 'noBlur'}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</motion.p>
            <motion.form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col align-items justify-content gap-12 font-semibold text-slate-200" variants={variants} initial={{filter: "blur(0px)"}} animate={textBlur ? 'blur' : 'noBlur'}>
                <fieldset disabled={isSubmitting} className="flex flex-col align-items justify-content">
                <h3>Name</h3>
                <input {...register('name')} disabled={isSubmitSuccessful} type="text" placeholder="Enter your name"></input>
                {errors.name && <h5 className="text-red-700/90">{errors.name.message}</h5>}
                <h3>Message</h3>
                <input {...register('message')} disabled={isSubmitSuccessful} type="text" placeholder="Enter your message"></input>
                {errors.message && <h5 className="text-red-700/90">{errors.message.message}</h5>}
                <h3>Message color</h3>
                <input {...register('color')} disabled={isSubmitSuccessful} type="text" placeholder="Enter message color"></input>
                {errors.color && <h5 className="text-red-700/90">{errors.color.message}</h5>}
                <h3>Email</h3>
                <input {...register('email')} disabled={isSubmitSuccessful} type="text" placeholder="Enter your email"></input>
                {errors.email && <h5 className="text-red-700/90">{errors.email.message}</h5>}
                </fieldset>
                <motion.button type="submit" disabled={isSubmitSuccessful ? true : isSubmitting ? true : false} className="relative top-2 size-fit text-slate-200 bg-blue-800 font-semibold text-[22px] rounded-[15px] py-[6px] px-[10px]" initial={{scale: 0, y: -20}} animate={{scale: 1, y: 0}} transition={{duration: .2}} whileHover={{scale: 1.1}}>{isSubmitting ? 'Submitting...' : isSubmitSuccessful ? 'Submitted' : 'Submit'}</motion.button>
                {errors.root && <h4 className="text-red-700">{errors.root.message}</h4>}
            </motion.form>
            <h2 className="text-green-400 font-bold text-[35px]">{isSubmitSuccessful ? 'You can go back to Lobby!' : isValid ? 'Valid!' : null}</h2>
            {isSubmitSuccessful ? <Link to='/' className="absolute bottom-10"><motion.div className="text-white text-[18px] border-[3px] border-blue-800 font-semibold bg-blue-600/30 size-fit py-[6px] px-[4px] rounded-[6px]" initial={{scale: 0, y: -20}} animate={{scale: 1}} transition={{duration: .1}} whileHover={{scale: 1.06}}>Go home</motion.div></Link> : null}
                <Link to='/'><motion.div className="text-white text-[16px] border-[2px] border-blue-800 font-semibold absolute top-[5%] left-[5%] bg-blue-600/30 size-fit py-[4px] px-[2px] rounded-[6px]" initial={{scale: 0, y: -20}} animate={{scale: 1}} transition={{duration: .1}} whileHover={{scale: 1.06}}>Go home</motion.div></Link>
                <motion.h3 className="size-fit text-[20px] text-slate-300 absolute left-[30%] top-[4%] border-bottom-[2px] border-white" initial={{scale: 1}} whileHover={{color: 'gold', scale: 1.04, cursor: 'pointer'}} onClick={() => colorSchema()}>Colors</motion.h3>
                <motion.div className="absolute flex justify-center items-center left-[20%] top-[6%] border-slate-400/80 border-[3px] w-[90%] h-[90%] bg-slate-800/90 text-[26px] font-semibold" variants={variants} initial={{opacity: 0, scale: 0, x: '-16.5%', y: '3%'}} animate={colorTemplate ? 'on' : 'off'}><h1 className="absolute top-[4%] font-bold text-[40px] text-amber-700">Message colors</h1><div className="flex flex-col justify-start items-center scrollbar-auto w-[90%] h-[70%] overflow-auto">{namedColors.map(color => <p className="text-blue-700">{color}</p>)}</div><img src="/icons8-x-90.png" className="absolute right-12 top-12 h-[72px] w-[72px] scrollbar-none" variants={variants} initial={{opacity: 0}} animate={colorTemplate ? 'visible' : null} transition={{duration: .5}} onClick={() => colorSchema()}/></motion.div>
                <motion.h3 className="size-fit text-[20px] text-slate-300 absolute left-[42%] top-[4%] border-bottom-[2px] border-white" initial={{scale: 1}} whileHover={{color: 'gold', scale: 1.04, cursor: 'pointer'}} onClick={() => previewSchema()}>Preview</motion.h3>
                <motion.div className="absolute w-[94%] h-[42%] left-[7%] top-[6%] bg-slate-950/70 border-mist-950/90 border-[3px] size-[20px] font-semibold flex flex-col justify-center items-center gap-[45px]" variants={variants} initial={{scale: 0, x: '-4.5%', y: '3%'}} animate={previewTemplate ? 'on' : 'off'}><div className="size-fit text-slate-300 flex justify-center gap-[38px] text-[35px] font-semibold"><h2>1234</h2><h2>John Doe</h2><h2 className="text-[goldenrod]">Welcome!</h2></div><div className="size-fit text-slate-300 flex justify-center gap-[38px]"><h3>Line Id</h3><h3>Name</h3><h3>Color: Goldenrod</h3></div></motion.div>
                <motion.h3 className="size-fit text-[20px] text-slate-300 absolute left-[54%] top-[4%] border-bottom-[2px] border-white" initial={{scale: 1}} whileHover={{color: 'gold', scale: 1.04, cursor: 'pointer'}} onClick={() => emailSchema()}>Send Email</motion.h3>
                <motion.div className="text-white absolute top-[12%] left-[54%] w-[240px] h-[180px] flex flex-col justify-center items-center gap-[20px] bg-slate-950/70 border-gray-900" variants={variants} initial={{scale: 0}} animate={emailTemplate ? 'on' : 'off'}><h2 className="realtive left-[32%] font-bold size-[28px] text-emerald-600 w-full">Send email?</h2><div className="text-sky-500 flex justify-center items-center gap-[20px] font-semibold"><motion.h3 variants={variants} initial={{scale: 1}} animate={emailBooleanTemplate ? 'emailBooleanYes' : 'emailBoolean'} onClick={() => emailBooleanOnClick()}>Yes</motion.h3><motion.h3 variants={variants} initial={{scale: 1}} animate={emailBooleanTemplate ? 'emailBoolean' : 'emailBooleanNo'} onClick={() => emailBooleanOnClick()}>No thanks</motion.h3></div></motion.div>
                 <motion.img src="/icons8-spin-90.png" className="absolute top-8 right-8 size-[45px]" initial={{rotate: 0, scale: 1}} onhover={{rotate: 120, scale: 1.06}} onClick={() => window.location.reload()} />
            </motion.div>
            <img src="/icons8-wreath-64.png" className="size-fit absolute top-14 left-14"/>
        </div>
    )
}
import { Cairo } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from '~/utils/api';

type Inputs = {
    username: string,
    password: string,
    checkPassword: string,
};

const cairo = Cairo({ weight: '700', subsets: ['arabic'] })
const cairoLight = Cairo({ weight: '500', subsets: ['arabic'] })


export default function Register() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>();
    const createUserMutation = api.example.createUser.useMutation()

    const router = useRouter()
    const onSubmit: SubmitHandler<Inputs> = (data) => {

        if (data.password === data.checkPassword) {
            const createUser = createUserMutation.mutate({
                password: data.password,
                username: data.username,
            })
            console.log(createUserMutation)

        }

        if (data.password !== data.checkPassword) {
            setError('password', {
                message: 'كلمة السر غير مطابقة'
            })
        }


    }

    return (
        <>
            <Head>
                <title>تسجيل الحسابات</title>
            </Head>



            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000e82] to-[#000e58]">
                <h1 className={`${cairo.className} text-3xl text-white mb-16 `}>
                    منظومة المخالفات
                </h1>
                <div className={`flex ${cairo.className} p-20 rounded-xl shadow-2xl   flex-col bg-white`} dir='rtl'>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center text-lg gap-8 flex-col m-auto">
                        {/* register your input into the hook by invoking the "register" function */}
                        <input className='w-60 border border-zinc-400 h-14 p-2 shadow-md rounded-xl bg-zinc-200 ' placeholder="اسم الدخول" required {...register("username")} />
                        {errors.password && <p>{errors.password.message}</p>}
                        <input type='password' className='w-60 shadow-md border border-zinc-400 h-14 p-2 rounded-xl bg-zinc-200' placeholder="كلمة المرور" required {...register("password")} />

                        <input type='password' className='w-60 shadow-md h-14 p-2 rounded-xl border border-zinc-400 bg-zinc-200 ' placeholder="أعد إدخال كلمة المرور" required {...register("checkPassword")} />
                        {/* include validation with required or other standard HTML validation rules */}
                        {/* errors will return when field validation fails  */}
                        <button type="submit" className={`bg-[#000e82] w-full h-14 rounded-xl text-white shadow-md text-2xl ${cairoLight.className}`}>سجل الحساب</button>
                    </form>
                </div>
            </div>
        </>
    );
}

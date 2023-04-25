import { SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react"
import Head from "next/head";
import { Cairo } from "next/font/google";
import { useRouter } from "next/router";



type Inputs = {
    username: string,
    password: string,
};

const cairo = Cairo({ weight: '700', subsets: ['arabic'] })
const cairoLight = Cairo({ weight: '500', subsets: ['arabic'] })

export default function SignIn() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const session = useSession()
    const router = useRouter()
    console.log(session)
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const onSignin = signIn('credentials', { redirect: false, username: data.username, password: data.password })
        if (session.status === 'authenticated') {
            router.back()
        }
    }


    return (
        <>
            <Head>
                <title>بوابة الدخول</title>
            </Head>

            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000e82] to-[#000e58]">
                <h1 className={`${cairo.className} text-3xl text-white mb-16 `}>
                    منظومة المخالفات
                </h1>
                <div className={`flex ${cairo.className} p-20 rounded-xl shadow-2xl   flex-col bg-white`} dir='rtl'>
                    <div className='m-auto flex-col flex items-center '>

                        <form method="post" className="flex items-center text-lg gap-8 flex-col m-auto" onSubmit={handleSubmit(onSubmit)} action="/api/auth/callback/credentials">
                            {/* register your input into the hook by invoking the "register" function */}
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="اسم الدخول" required {...register("username")} />
                            {errors.password && <p>{errors.password.message}</p>}
                            <input type='password' className='w-60 shadow-md h-14 p-2 rounded-xl border border-zinc-400 bg-zinc-200' placeholder="كلمة المرور" required {...register("password")} />

                            {/* include validation with required or other standard HTML validation rules */}
                            {/* errors will return when field validation fails  */}

                            <button type="submit" className={`bg-[#000e82] w-full h-14 rounded-xl text-white shadow-md text-2xl ${cairoLight.className}`}>الدخول</button>
                            {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}

                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}


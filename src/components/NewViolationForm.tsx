import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react"
import { Cairo } from "next/font/google";
import { useRouter } from "next/router";
import type { ViolationEntry, ViolationCar, ViolationPerson, ViolationTicket } from '@prisma/client'
import { api } from "~/utils/api";

type Inputs = ViolationCar & ViolationEntry & ViolationPerson & ViolationTicket;

const cairo = Cairo({ weight: '700', subsets: ['arabic'] })
const cairoLight = Cairo({ weight: '500', subsets: ['arabic'] })

export default function NewViolationForm() {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();
    const createViolationMutation = api.example.createViolation.useMutation()
    const session = useSession()
    const router = useRouter()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const createViolation = createViolationMutation.mutate({
            receiptNumber: data.recieptNumber as string,
            violaitonNumber: data.violationNumber as string,
            unit: data.unit as string,
            officerName: data.officerName as string,
            serviceNumber: data.serviceNumber as string,
            rank: data.rank as string,
            date: data.date as string,
            placeOfViolation: data.placeOViolation as string,
            comment: data.comment as string,
            plateNumber: data.plateNumber as string,
            lineOfWork: data.lineOfWork as string,
            design: data.design as string,
            manufacturer: data.manufacturer as string,
            model: data.model as string,
            color: data.color as string,
            countryOfOrigin: data.countryOfOrigin as string,
            yearOfManufacture: data.yearOfManufacture as string,
            chassisNumber: data.chassisNumber as string,
            engineNumber: data.engineNumber as string,
            typeOfOwner: data.typeOfOwner as string,
            sectorOfOwner: data.sectorOfOwner as string,
            nameOfOwner: data.nameOfOwner as string,
            nameOfDriver: data.nameOfDriver as string,
            licenseNumber: data.licenseNumber as string,
            typeOfLicense: data.typeOfLicense as string,
            placeOfIssue: data.placeOfissue as string,
            nameOnDriverLicense: data.nameOfDriver as string,
            typeOfArticle: data.typeOfArticle as string,
            numberOfArticle: data.numberOfArticle as string,
            descriptionOfArticle: data.descriptionOfArticle as string,
            amountToBeFined: data.amountToBeFined as string,
        })
        if (createViolationMutation.isSuccess) {
            alert('تم الإددخال بنجاح')
            reset()
        }

    }

    console.log(watch('date'))
    return (
        <>
            <div className="flex">

                <div className={`flex ${cairo.className} p-20 rounded-xl shadow-2xl bg-white`} dir='rtl'>
                    <div className='m-auto flex items-center '>

                        <form method="post" className="grid grid-cols-2 items-center text-lg gap-8  m-auto" onSubmit={handleSubmit(onSubmit)}>
                            {/* register your input into the hook by invoking the "register" function */}
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم الإيصال"  {...register("recieptNumber")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم المخالفة"  {...register("violationNumber")} />

                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="الرتبة"  {...register("rank")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="الوحدة"  {...register("unit")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="اسم الشرطي"  {...register("officerName")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="الرقم"  {...register("serviceNumber")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="مكان الخالفة"  {...register("placeOViolation")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم اللوحة"  {...register("plateNumber")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="نوع العمل"  {...register("lineOfWork")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="تصميم"  {...register("design")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="النوع"  {...register("manufacturer")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="الصنف"  {...register("model")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="اللون"  {...register("color")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="بلد الصنع"  {...register("countryOfOrigin")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="تاريخ الصنع"  {...register("yearOfManufacture")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم الهيكل"  {...register("chassisNumber")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم المحرك"  {...register("engineNumber")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="نوع المالك"  {...register("typeOfOwner")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="اسم المالك"  {...register("nameOfOwner")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="قطاع المالك"  {...register("sectorOfOwner")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="نوع المادة"  {...register("typeOfArticle")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="وصف المادة"  {...register("descriptionOfArticle")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم المادة"  {...register("numberOfArticle")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="القيمة المالية"  {...register("amountToBeFined")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="اسم السائق"  {...register("nameOfDriver")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم الرخصة"  {...register("licenseNumber")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="الدرجة"  {...register("typeOfLicense")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="مكان صدورها"  {...register("placeOfissue")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="اسم صاحب الرخصة"  {...register("nameOnDriverLicense")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' type='date' placeholder="التاريخ"  {...register("date")} />
                            <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="ملاحظات"  {...register("comment")} />

                            {/* {errors.password && <p>{errors.password.message}</p>} */}
                            {/* include validation withor other standard HTML validation rules */}
                            {/* errors will return when field validation fails  */}
                            {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}

                            <button type="submit" className={`bg-[#000e82] w-full h-14 rounded-xl text-white shadow-md text-2xl ${cairoLight.className}`}>الدخول</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}


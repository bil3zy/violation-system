import { Cairo } from 'next/font/google';
import React, { useState } from 'react'
import { api } from '~/utils/api'
import { SubmitHandler, useForm } from "react-hook-form";

import type { ViolationEntry, ViolationCar, ViolationPerson, ViolationTicket } from '@prisma/client'
import type { AppRouter } from '~/server/api/root';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutput = inferRouterOutputs<AppRouter>;

type Inputs = ViolationCar & ViolationEntry & ViolationPerson & ViolationTicket;
type ViolationsOutput = RouterOutput['example']['getViolations'];

const options = { day: ['numeric'], month: ['long'], weekday: ['long'], year: 'numeric' };

const cairo = Cairo({ weight: '500', subsets: ['arabic'] })

export default function ViolationEntriesRecord() {
    const [page, setPage] = useState(0)
    const [violationsResults, setViolationsResults] = useState([])
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const getAllViolationEntiresQuery = api.example.getAllViolationEntries.useInfiniteQuery({
        limit: 10,
    }, { getNextPageParam: (lastPage) => lastPage.nextCursor },)
    const searchViolationsMutation = api.example.getViolations.useMutation()

    const violationEntriesArray = getAllViolationEntiresQuery.data?.pages[page]?.violationEntries;

    const searchViolationsData = searchViolationsMutation.data;

    const onSubmit: SubmitHandler<Inputs> = (data, e): void => {
        e?.preventDefault();
        const createdAtValue = new Date(data.createdAt);
        const searchViolations = searchViolationsMutation.mutate({
            recieptNumber: data.recieptNumber!,
            violaitonNumber: data.violationNumber!,
            unit: data.unit!,
            officerName: data.officerName!,
            serviceNumber: data.serviceNumber!,
            rank: data.rank!,
            placeOfViolation: data.placeOViolation!,
            comment: data.comment!,
            plateNumber: data.plateNumber!,
            lineOfWork: data.lineOfWork!,
            design: data.design!,
            manufacturer: data.manufacturer!,
            model: data.model!,
            color: data.color!,
            countryOfOrigin: data.countryOfOrigin!,
            yearOfManufacture: data.yearOfManufacture!,
            chassisNumber: data.chassisNumber!,
            engineNumber: data.engineNumber!,
            typeOfOwner: data.typeOfOwner!,
            sectorOfOwner: data.sectorOfOwner!,
            nameOfOwner: data.nameOfOwner!,
            nameOfDriver: data.nameOfDriver!,
            licenseNumber: data.licenseNumber!,
            typeOfLicense: data.typeOfLicense!,
            placeOfIssue: data.placeOfissue!,
            nameOnDriverLicense: data.nameOfDriver!,
            typeOfArticle: data.typeOfArticle!,
            numberOfArticle: data.numberOfArticle!,
            descriptionOfArticle: data.descriptionOfArticle!,
            amountToBeFined: data.amountToBeFined!,
            createdAt: createdAtValue,
        })
    }

    const handleNextPage = async () => {
        if (getAllViolationEntiresQuery.hasNextPage) {

            await getAllViolationEntiresQuery.fetchNextPage()
            setPage(page + 1)
        }
        else if (getAllViolationEntiresQuery.data!.pages.length - 1 > page) {
            setPage(page + 1)
        }
    }

    const handlePrevPage = async () => {
        if (page > 0) {
            await getAllViolationEntiresQuery.fetchPreviousPage()
            setPage(page - 1)
        }
    }

    return (
        <>
            {/* Search */}
            <div dir='rtl' className={`${cairo.className} my-12`}>
                <form method="post" className="flex flex-wrap w-3/5 justify-center items-center text-lg gap-8  mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم الإيصال"  {...register("recieptNumber")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم المخالفة"  {...register("violationNumber")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="الرقم"  {...register("serviceNumber")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم اللوحة"  {...register("plateNumber")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="نوع العمل"  {...register("lineOfWork")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="نوع المالك"  {...register("typeOfOwner")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="اسم المالك"  {...register("nameOfOwner")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="اسم السائق"  {...register("nameOfDriver")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="رقم الرخصة"  {...register("licenseNumber")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' placeholder="اسم صاحب الرخصة"  {...register("nameOnDriverLicense")} />
                    <input className='w-60 h-14 p-2 shadow-md rounded-xl bg-zinc-200 border border-zinc-400 ' type='date' placeholder="التاريخ"  {...register("createdAt")} />

                    <button type="submit" className={`bg-[#000e82] border-2 border-white  my-8 h-14 rounded-xl text-white shadow-md text-2xl active:bg-[#000e90] transition-colors w-1/2  ${cairo.className}`}>البحث</button>
                </form>
            </div>
            <table className={`table-auto w-3/5 ${cairo.className} shadow-md text-lg `} >
                <thead>
                    <tr className='bg-[#054C6E] h-20 text-white border border-zinc-400 '>
                        <th className='text-xl '>التاريخ</th>
                        <th className=''>الوحدة</th>
                        <th className=''>مكان المخالفة</th>
                        <th className=''>رقم المخالفة</th>
                    </tr>
                </thead>

                <tbody className='border border-zinc-400'>
                    {searchViolationsData ?
                        searchViolationsData.map((el: ViolationEntry, i: number) => {
                            return (
                                <tr key={i} className='even:bg-slate-50 odd:bg-slate-200 first-of-type::rounded-bl-xl first-of-type::border-2'>
                                    <td className='text-center h-16'>{new Intl.DateTimeFormat('ar-u-ca-latin-nu-latn', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(el.createdAt)}
                                    </td>
                                    <td className='text-center'>{el.unit}</td>
                                    <td className='text-center'>{el.placeOViolation}</td>
                                    <td className='text-center'>{el.violationNumber}</td>
                                </tr>
                            )
                        }) :
                        violationEntriesArray?.map((el: ViolationEntry, i: number) => {
                            return (
                                <tr key={i} className='even:bg-slate-50 odd:bg-slate-200 first-of-type::rounded-bl-xl first-of-type::border-2'>
                                    <td className='text-center h-16'>{new Intl.DateTimeFormat('ar-u-ca-latin-nu-latn', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(el.createdAt)}</td>
                                    <td className='text-center'>{el.unit}</td>
                                    <td className='text-center'>{el.placeOViolation}</td>
                                    <td className='text-center'>{el.violationNumber}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="flex w-40 justify-evenly">
                <button className={`${cairo.className} text-white text-xl`} onClick={() => void handlePrevPage()}>{`<<`}</button>
                <p className='text-white text-2xl'>{page + 1}</p>
                <button className={`${cairo.className} text-white text-xl`} onClick={() => void handleNextPage()}>{`>>`}</button>

            </div>
        </>
    )
}

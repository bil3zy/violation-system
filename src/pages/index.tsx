import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Cairo } from 'next/font/google'


import SignIn from "./signin";
import NewViolationForm from "~/components/NewViolationForm";
import { useState } from "react";
import ViolationEntriesRecord from "~/components/ViolationEntriesRecord";

const cairo = Cairo({ weight: '600', subsets: ['arabic'] })
const cairoBold = Cairo({ weight: '700', subsets: ['arabic'] })

const Home: NextPage = () => {
  const [openNewViolationEntry, setOpenNewViolationEntry] = useState(false)
  const [openViolationEntryRecords, setOpenViolationEntryRecords] = useState(false)
  const { data: sessionData } = useSession();
  // console.log(getAllViolationEntiresQuery)

  const handleNewViolationFormClick = () => {
    setOpenNewViolationEntry(true)
    setOpenViolationEntryRecords(false)
  }
  const handleViolationRecordsClick = () => {
    setOpenNewViolationEntry(false)
    setOpenViolationEntryRecords(true)
  }

  if (sessionData) {

    return (
      <>
        <Head>
          <title>منظومة المخالفات</title>
          <meta name="description" content="منظومة المخالفات لوزارة الداخلية الليبية" />
          <link rel="icon" href="moi-logo.png" />
        </Head>
        <main className="flex py-24 min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000e82] to-[#000e58]">
          <h1 className={`${cairo.className} text-3xl text-white `}>
            منظومة المخالفات
          </h1>

          {/* <button onClick={() => getAllViolationEntiresQuery.hasNextPage && getAllEntiresQuery.fetchNextPage()}>click me</button> */}
          <p className={`${cairo.className} text-white text-1xl mb-4`}>{`مرحبا`}</p>
          <div className="flex w-5/6 justify-evenly gap-20">

            <button onClick={handleNewViolationFormClick} className={` ${cairoBold.className}  text-xl  p-2 shadow-md rounded-xl bg-white text-[#000e82] mb-8 border border-[#000e62] outline-[#000e62] outline-4 w-1/2 h-20`}>إضافة مخالفة جديدة</button>
            <button onClick={handleViolationRecordsClick} className={` ${cairoBold.className} text-xl  p-2 shadow-md rounded-xl bg-white text-[#000e82] mb-8 border border-zinc-400 w-1/2 h-20`}>سجل المخالفات</button>

          </div>
          {openNewViolationEntry &&
            <NewViolationForm />
          }
          {openViolationEntryRecords && <ViolationEntriesRecord />}
        </main>
      </>
    );
  } else {
    return (
      <SignIn />
    )
  }
};

export default Home;
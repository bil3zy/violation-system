import { z } from "zod";
import bcrypt from 'bcryptjs'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// import type { ViolationEntry, ViolationCar, ViolationPerson, ViolationTicket } from '@prisma/client'

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  createUser: publicProcedure.input(z.object({
    username: z.string(),
    password: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const password = bcrypt.hashSync(input.password, 8)

    const newUser = await ctx.prisma.violationsUser.create({
      data: {
        name: input.username,
      }
    }).then(async (res) => {

      const newAccount = await ctx.prisma.violationsAccount.create({
        data: {
          username: input.username,
          password,
          type: 'user',
          provider: 'credentials',
          providerAccountId: 'N/A',
          userId: res.id,
        }
      }).then((res) => {
        return res;
      })
      return newAccount;
    })
    return newUser;
  }),
  getViolations: protectedProcedure.input(z.object({
    recieptNumber: z.string().optional(),
    violaitonNumber: z.string().optional(),
    unit: z.string().optional(),
    officerName: z.string().optional(),
    serviceNumber: z.string().optional(),
    rank: z.string().optional(),
    placeOfViolation: z.string().optional(),
    comment: z.string().optional(),
    plateNumber: z.string().optional(),
    lineOfWork: z.string().optional(),
    design: z.string().optional(),
    manufacturer: z.string().optional(),
    model: z.string().optional(),
    color: z.string().optional(),
    countryOfOrigin: z.string().optional(),
    yearOfManufacture: z.string().optional(),
    chassisNumber: z.string().optional(),
    engineNumber: z.string().optional(),
    typeOfOwner: z.string().optional(),
    sectorOfOwner: z.string().optional(),
    nameOfOwner: z.string().optional(),
    nameOfDriver: z.string().optional(),
    licenseNumber: z.string().optional(),
    typeOfLicense: z.string().optional(),
    placeOfIssue: z.string().optional(),
    nameOnDriverLicense: z.string().optional(),
    typeOfArticle: z.string().optional(),
    numberOfArticle: z.string().optional(),
    descriptionOfArticle: z.string().optional(),
    amountToBeFined: z.string().optional(),
    createdAt: z.date().optional(),
  })).mutation(async ({ ctx, input }) => {
    const violations = await ctx.prisma.violationsEntry.findMany({
      where: {
        recieptNumber: { contains: input.recieptNumber },
        comment: { contains: input.comment },
        createdAt: { gte: new Date(input.createdAt as Date) },
        officerName: { contains: input.officerName }
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return violations

  }),
  getAllViolationEntries: protectedProcedure.input(z.object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
  }))
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const violationEntries = await ctx.prisma.violationsEntry.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc'
        },
      })
      let nextCursor: typeof cursor | undefined = undefined;
      if (violationEntries.length > limit) {
        const nextItem = violationEntries.pop();
        nextCursor = nextItem!.id
      }
      console.log(violationEntries);
      return { violationEntries, nextCursor }
    }),
  createViolation: protectedProcedure.input(
    z.object({
      receiptNumber: z.string(),
      violaitonNumber: z.string(),
      unit: z.string(),
      officerName: z.string(),
      serviceNumber: z.string(),
      rank: z.string(),
      date: z.string(),
      placeOfViolation: z.string(),
      comment: z.string(),
      plateNumber: z.string(),
      lineOfWork: z.string(),
      design: z.string(),
      manufacturer: z.string(),
      model: z.string(),
      color: z.string(),
      countryOfOrigin: z.string(),
      yearOfManufacture: z.string(),
      chassisNumber: z.string(),
      engineNumber: z.string(),
      typeOfOwner: z.string(),
      sectorOfOwner: z.string(),
      nameOfOwner: z.string(),
      nameOfDriver: z.string(),
      licenseNumber: z.string(),
      typeOfLicense: z.string(),
      placeOfIssue: z.string(),
      nameOnDriverLicense: z.string(),
      typeOfArticle: z.string(),
      numberOfArticle: z.string(),
      descriptionOfArticle: z.string(),
      amountToBeFined: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {

    let violationId = ''
    const createdViolationEntry = await ctx.prisma.violationsEntry.create({
      data: {
        comment: input.comment,
        date: input.date,
        officerName: input.officerName,
        placeOViolation: input.placeOfViolation,
        rank: input.rank,
        recieptNumber: input.receiptNumber,
        serviceNumber: input.serviceNumber,
        violationNumber: input.violaitonNumber,
        unit: input.unit,
      }
    }).then((res) => {
      violationId = res.id;
    });



    const createViolationCar = await ctx.prisma.violationsCar.create({
      data: {
        chassisNumber: input.chassisNumber,
        color: input.color,
        countryOfOrigin: input.countryOfOrigin,
        design: input.design,
        engineNumber: input.engineNumber,
        lineOfWork: input.lineOfWork,
        manufacturer: input.manufacturer,
        model: input.model,
        plateNumber: input.plateNumber,
        yearOfManufacture: input.yearOfManufacture,
        violationsEntryId: violationId,
      }

    })
    const createViolationPerson = await ctx.prisma.violationsPerson.create({
      data: {
        licenseNumber: input.licenseNumber,
        nameOfDriver: input.nameOfDriver,
        nameOfOwner: input.nameOfOwner,
        nameOnDriverLicense: input.nameOnDriverLicense,
        placeOfissue: input.placeOfIssue,
        sectorOfOwner: input.sectorOfOwner,
        typeOfLicense: input.typeOfLicense,

        typeOfOwner: input.typeOfOwner,
        violationsEntryId: violationId,
      }
    })
    const createViolationTicket = await ctx.prisma.violationsTicket.create({
      data: {
        amountToBeFined: input.amountToBeFined,

        descriptionOfArticle: input.descriptionOfArticle,
        numberOfArticle: input.numberOfArticle,
        typeOfArticle: input.typeOfArticle,
        violationsEntryId: violationId,
      }
    })
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

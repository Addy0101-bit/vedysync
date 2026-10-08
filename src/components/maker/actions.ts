import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { auth } from '#/lib/auth';
import { prisma } from '#/lib/db';
import { sendOnboardingThanksEmail } from '#/lib/email';

export const submitVerification = createServerFn({ method: 'POST' })
  .validator((data: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dob: Date;
    specialization: string;
    registrationNumber: string;
    degreeFileUrl: string;
    registrationFileUrl: string;
    idProofType: string;
    idProofFileUrl: string;
    profilePhotoUrl?: string;
  }) => data)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) throw new Error("Unauthorized");

    await prisma.$transaction([
      prisma.maker.create({
        data: {
          userId: session.user.id,
          firstName: data.firstName,
          middleName: data.middleName || null,
          lastName: data.lastName,
          dob: data.dob,
          specialization: data.specialization,
          registrationNumber: data.registrationNumber,
          degreeFileUrl: data.degreeFileUrl,
          registrationFileUrl: data.registrationFileUrl,
          idProofType: data.idProofType,
          idProofFileUrl: data.idProofFileUrl,
          profilePhotoUrl: data.profilePhotoUrl,
        }
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { verificationStatus: 'pending' }
      })
    ]);

    await sendOnboardingThanksEmail(session.user.email, data.firstName);

    return { success: true };
  });

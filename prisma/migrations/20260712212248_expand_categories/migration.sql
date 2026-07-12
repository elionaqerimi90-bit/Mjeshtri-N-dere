-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'ZDRUKTHETAR';
ALTER TYPE "Category" ADD VALUE 'MEKANIK';
ALTER TYPE "Category" ADD VALUE 'PASTRIM';
ALTER TYPE "Category" ADD VALUE 'KOPSHTAR';
ALTER TYPE "Category" ADD VALUE 'KLIMATIZIM';
ALTER TYPE "Category" ADD VALUE 'NDERTIMTAR';
ALTER TYPE "Category" ADD VALUE 'KUZHINIER';
ALTER TYPE "Category" ADD VALUE 'FOTOGRAF';
ALTER TYPE "Category" ADD VALUE 'CELESA';
ALTER TYPE "Category" ADD VALUE 'TRANSPORT';
ALTER TYPE "Category" ADD VALUE 'IT';
ALTER TYPE "Category" ADD VALUE 'MOBILERI';
ALTER TYPE "Category" ADD VALUE 'BABYSITTING';
ALTER TYPE "Category" ADD VALUE 'TUTOR';

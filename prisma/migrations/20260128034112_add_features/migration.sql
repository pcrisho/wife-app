-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "numberOfGuests" INTEGER NOT NULL DEFAULT 1,
    "phone" TEXT,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "willAttend" BOOLEAN,
    "confirmedAt" TIMESTAMP(3),
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_code_key" ON "Guest"("code");

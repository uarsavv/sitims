-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Text" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "textId" INTEGER NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alphabet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Alphabet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Letter" (
    "id" SERIAL NOT NULL,
    "original" TEXT NOT NULL,
    "converted" TEXT NOT NULL,
    "alphabetId" INTEGER NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Letter" ADD CONSTRAINT "Letter_alphabetId_fkey" FOREIGN KEY ("alphabetId") REFERENCES "Alphabet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

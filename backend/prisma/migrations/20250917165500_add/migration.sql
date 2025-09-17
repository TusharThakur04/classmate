-- CreateTable
CREATE TABLE "public"."FlowRun" (
    "id" TEXT NOT NULL,
    "flowId" TEXT NOT NULL,

    CONSTRAINT "FlowRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FlowRunOutbox" (
    "id" TEXT NOT NULL,
    "flowRunId" TEXT NOT NULL,

    CONSTRAINT "FlowRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FlowRun_flowId_key" ON "public"."FlowRun"("flowId");

-- CreateIndex
CREATE UNIQUE INDEX "FlowRunOutbox_flowRunId_key" ON "public"."FlowRunOutbox"("flowRunId");

-- AddForeignKey
ALTER TABLE "public"."FlowRun" ADD CONSTRAINT "FlowRun_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "public"."Flow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FlowRunOutbox" ADD CONSTRAINT "FlowRunOutbox_flowRunId_fkey" FOREIGN KEY ("flowRunId") REFERENCES "public"."FlowRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "public"."FlowRun" DROP CONSTRAINT "FlowRun_flowId_fkey";

-- AddForeignKey
ALTER TABLE "public"."FlowRun" ADD CONSTRAINT "FlowRun_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "public"."Flow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

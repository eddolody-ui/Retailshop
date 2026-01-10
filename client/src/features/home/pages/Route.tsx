import { OrderDataTable } from "@/components/DataTable";
import ContentLayout from "@/components/ui/layout";

export function Route() {
  return (
    <ContentLayout>
      <p className="text-muted-foreground">
        Here&apos;s a list of your routes!
      </p>
      <OrderDataTable />
    </ContentLayout>
  );
}

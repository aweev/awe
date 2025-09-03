// app/(admin)/admin/content/page.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContentManagementPage() {
    const t = useTranslations("AdminContentPage");
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-serif">{t("title")}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> {t("cta")}
        </Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.title")}</TableHead>
              <TableHead>{t("table.status")}</TableHead>
              <TableHead>{t("table.author")}</TableHead>
              <TableHead>{t("table.lastUpdated")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Our 2024 Impact Report</TableCell>
              <TableCell><Badge>{t("status.published")}</Badge></TableCell>
              <TableCell>Admin User</TableCell>
              <TableCell>2 days ago</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">A Volunteer&apos;s Story</TableCell>
              <TableCell><Badge variant="secondary">{t("status.draft")}</Badge></TableCell>
              <TableCell>Jane Doe</TableCell>
              <TableCell>1 hour ago</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
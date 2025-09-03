// app/(admin)/admin/page.tsx 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Users, FileText } from "lucide-react";
import { getTranslations } from "next-intl/server"; // Changed from useTranslations

export default async function AdminHomePage() {
  // Use getTranslations for server component instead of useTranslations
  const t = await getTranslations("AdminDashboard");
  
  return (
    <div>
      <h1 className="text-3xl font-bold font-serif mb-6">{t("title")}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("cards.donations.title")}</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€12,234.56</div>
            <p className="text-xs text-muted-foreground">{t("cards.donations.subtitle")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("cards.volunteers.title")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23</div>
            <p className="text-xs text-muted-foreground">{t("cards.volunteers.subtitle")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("cards.content.title")}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 {t("cards.content.drafts")}</div>
            <p className="text-xs text-muted-foreground">{t("cards.content.subtitle")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
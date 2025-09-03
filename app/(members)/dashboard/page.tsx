// app/(members)/dashboard/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function MembersDashboardPage() {
  const t = useTranslations("DashboardPage");

  return (
    <div>
      <h1 className="text-3xl font-bold font-serif mb-4">{t("title")}</h1>
      <p className="text-muted-foreground mb-8">{t("welcomeMessage", { name: "Alex" })}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.impact.title")}</CardTitle>
            <CardDescription>{t("cards.impact.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">120 Hours</p>
            <p className="text-xs text-muted-foreground">Contributed This Year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.training.title")}</CardTitle>
            <CardDescription>{t("cards.training.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3 / 5</p>
            <p className="text-xs text-muted-foreground">Modules Completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
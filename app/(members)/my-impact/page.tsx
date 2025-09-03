// app/(members)/my-impact/page.tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function MyImpactPage() {
  const t = useTranslations("MyImpactPage");

  return (
    <div>
      <h1 className="text-3xl font-bold font-serif mb-4">{t("title")}</h1>
      <p className="text-muted-foreground mb-8">{t("description")}</p>

      <Card>
        <CardHeader>
          <CardTitle>{t("timelineTitle")}</CardTitle>
        </CardHeader>
        {/* A timeline of contributions would be rendered here */}
      </Card>
    </div>
  );
}
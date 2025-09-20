import { Card, CardContent, CardHeader } from "./ui/card";

export default function ErrorCard({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="w-full h-[40vh] flex items-center justify-center">
      <Card className="grow max-w-lg">
        <CardHeader>
          <h4 className="text-sm text-destructive">Error</h4>
          <h3 className="text-xl font-semibold">{title}</h3>
        </CardHeader>
        <CardContent className="italic">{message}</CardContent>
      </Card>
    </div>
  );
}

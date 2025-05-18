import { Text } from "@radix-ui/themes";
import { getT } from "@/app/i18n";

export default async function Footer() {
  const { t } = await getT();

  return (
    <footer className="w-full flex justify-center p-4">
      <Text size="1">{t('footer')}</Text>
    </footer>
  );
}
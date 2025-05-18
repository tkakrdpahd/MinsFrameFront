import { NavigationMenu } from "radix-ui";
import { Heading } from "@radix-ui/themes";
import { getT } from "@/app/i18n";

export default async function Header() {
  const { i18n, t } = await getT();

  const currentLocale = i18n.language;

  return (
    <header className="flex justify-between items-center p-4">
      <Heading size="3">{t('header.title')}</Heading>
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href={`/${currentLocale}`}>{t('header.nav.home')}</NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator />
        </NavigationMenu.List>

        <NavigationMenu.Viewport />
      </NavigationMenu.Root>
    </header>
  );
}
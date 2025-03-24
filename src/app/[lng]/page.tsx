import Link from "next/link";
import { Grid, Flex, Box, Text, Heading } from "@radix-ui/themes";
import SMPTE from "@/fsd/shared/SMPTE";

function Information() {
    return(
        <Flex direction="column" gap="4">
            <Box>
                <Heading as="h2">About</Heading>
                <Text>This framework constructed based on following libraries</Text>
            </Box>
            <Box>
                <ul className="flex flex-col gap-4">
                    <li className="flex flex-col">
                        <Heading as="h3">Base</Heading>
                        <Text>NextJs 15</Text>
                    </li>
                    <li className="flex flex-col">
                        <Heading as="h3">UI Kits</Heading>
                        <Text> - Tailwindcss 4.0</Text>
                        <Text> - Radix UI/Themes</Text>
                        <Text> - Radix Icons</Text>
                        <Text> - Radix Colors</Text>
                        <Text> - React-toastify</Text>
                        <Text> - D3</Text>
                    </li>
                    <li className="flex flex-col">
                        <Heading>Data Management</Heading>
                        <Text>Redux/toolkit</Text>
                        <Text>@tanstack/react-query v5</Text>
                    </li>
                    <li className="flex flex-col">
                        <Heading>Internationalization</Heading>
                        <Link href="https://www.npmjs.com/package/next-i18next"><Text>next-i18next</Text></Link>
                        <Text>react-i18next</Text>
                        <Text>i18next</Text>
                        <Text>i18next-resources-to-backend</Text>
                    </li>
                </ul>
            </Box>
        </Flex>
    );
}
export default function Index() {
    return(
        <div className="w-full h-full flex flex-col items-center">
            <Grid gap="2" p="2">
                <Heading size="6" align="center" as="h1">Mins Frame</Heading>
                <SMPTE/>
                <Information/>
                <Text size="2" align="center">ⓒ 2025 Minseok Doo ALL RIGHTS RESERVED.</Text>
            </Grid>
        </div>
    );
}
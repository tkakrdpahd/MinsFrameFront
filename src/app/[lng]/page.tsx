import Link from "next/link";
import { Grid, Flex, Box, Text, Heading } from "@radix-ui/themes";

function SMPTE() {
    return(
        <Flex width="34vw" height="24vw" direction="column">
            <Flex width="100%" height="60%">
                <Box width="100%" height="100%" className="bg-[var(--gray-6)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--yellow-6)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--sky-6)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--green-6)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--pink-6)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--red-6)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--indigo-6)]"></Box>
            </Flex>
            <Flex width="100%" height="10%">
                <Box width="100%" height="100%" className="bg-[var(--blue-6)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--gray-1)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--pink-6)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--gray-1)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--sky-6)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--gray-1)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--gray-6)]"></Box>
            </Flex>
            <Flex width="100%" height="30%">
                <Box width="100%" height="100%" className="bg-[var(--blue-3)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--gray-12)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--iris-3)]"></Box>
                <Box width="100%" height="100%" className="bg-[var(--gray-2)]"></Box>
                <Flex width="100%" height="100%">
                    <Box width="100%" height="100%" className="bg-[var(--gray-1)]"></Box>
                    <Box width="100%" height="100%" className="bg-[var(--gray-4)]"></Box>
                    <Box width="100%" height="100%" className="bg-[var(--gray-5)]"></Box>
                </Flex>
                <Box width="100%" height="100%" className="bg-[var(--gray-2)]"></Box>
            </Flex>
        </Flex>
    );
}

export default function Index() {
    return(
        <div className="w-full h-full flex flex-col items-center">
            <Grid gap="2" p="2">
                <Heading size="6" align="center" as="h1">Mins Frame</Heading>
                <SMPTE/>
                <Flex direction="column">
                    <Box>
                        <Heading as="h2">About</Heading>
                        <Text>This framework constructed based on following libraries</Text>
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
                <Text size="2" align="center">ⓒ 2025 Minseok Doo ALL RIGHTS RESERVED.</Text>
            </Grid>
        </div>
    );
}
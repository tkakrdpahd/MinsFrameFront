import { Flex, Box, Heading } from "@radix-ui/themes";

export default function SMPTE() {
    return(
        <Flex width="34vw" height="24vw" direction="column" gap="2">
            <Heading align="center">Radix-Color Tester</Heading>
            <Box width="100%" height="100%">
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
            </Box>
        </Flex>
    );
}
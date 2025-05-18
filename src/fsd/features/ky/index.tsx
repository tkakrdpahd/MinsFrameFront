import ky from 'ky'
import { Box, Heading, Text } from '@radix-ui/themes'

export default async function Ky() {
  const baseUrl = process.env.NEXT_PUBLIC_API_HOST
  // /api/hello
  const response = await ky.get(`${baseUrl}/api/hello`).json() as { message: string }
  return (
    <Box>
        <Heading>Ky Test</Heading>
        <Text>{response.message}</Text>
    </Box>
  )
}
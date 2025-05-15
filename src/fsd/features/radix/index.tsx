import { Form } from 'radix-ui'
import { TextField, Heading, Text } from '@radix-ui/themes'

export default function Radix() {
  return (
    <Form.Root>
        <Heading>Radix-UI Tester</Heading>
        <Form.Field name="name">
            <Form.Label>
                <Text>Name</Text>
            </Form.Label>
            <Form.Control asChild>
                <TextField.Root name="name" placeholder="Name" />
            </Form.Control>
        </Form.Field>
        <Form.Submit>Submit</Form.Submit>
    </Form.Root>
  )
}
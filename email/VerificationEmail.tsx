import { Html } from "@react-email/html";
import { Head } from "@react-email/Head";
import { Font } from "@react-email/Font";
import { Preview } from "@react-email/Preview";
import { Heading } from "@react-email/Heading";
import { Row } from "@react-email/Row";
import { Section } from "@react-email/Section";
import { Text } from "@react-email/Text";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title> Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="verdana"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview> Heres is your verification code {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            
            Thank you for the registering please user the folloeing verification
            cde to complete your registeration
          </Text>
        </Row>
        <Row>
          <Text> {otp}</Text>
        </Row>
        <Row>
          <Text>If you did not request this code please ignore this code</Text>
        </Row>
      </Section>
    </Html>
  );
}

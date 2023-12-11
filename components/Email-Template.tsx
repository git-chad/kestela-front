import * as React from 'react';

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface KestelaInviteEmailProps {
  firstName: string;
  company: string;
}

export const EmailTemplate = ({ firstName, company }: KestelaInviteEmailProps) => (
  <Html>
    <Head />
    <Preview>The best for investments</Preview>
    <Body style={main}>
      <Container style={container}>
      <Text style={title}>Kestela</Text>
        <Text style={paragraph}>Hi {firstName},</Text>
        <Text style={paragraph}>
          Milton has gave you access to read all {company}&apos;s analytics in Quickbooks.
          Head over to Kestela to get started.
        </Text>
        <Text style={paragraph}>
          If you do not wish to continue, simply ignore this email.
        </Text>
        <Section style={btnContainer}>
          <Button style={{ ...button, padding: '12px' }} href="kestela.com">
            Accept
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Kestela Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>3344 False Rd - Jay Tea County, FL 94402</Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#5064ff',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#5064ff',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};

const title = {
    fontSize: '24px',
    lineHeight: '26px',
    color: '#5064ff',
    weight: 'bold'
}
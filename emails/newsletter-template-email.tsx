import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface CryptoInfo {
  name: string;
  symbol: string;
  price: number;
}

interface WeatherInfo {
  city: string;
  temperature: string;
}

interface NewsletterTemplateEmailProps {
  title?: string;
  weatherInfo?: WeatherInfo | null;
  cryptoInfo?: CryptoInfo[];
  interval?: string;
  time?: string;
  unsubscribeUrl?: string;
}

export default function NewsletterTemplateEmail({
  title = "Crypto & Weather Newsletter",
  weatherInfo = {
    city: "New York",
    temperature: "22°C",
  },
  cryptoInfo = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 45000,
    },
  ],
  interval = "Daily",
  time = "9:00 AM",
  unsubscribeUrl = "https://example.com/unsubscribe",
}: NewsletterTemplateEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {title} - {interval} Update
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column>
                <Text style={headerTitle}>
                  {/* Mail icon */}
                  <span style={{ marginRight: "8px" }}>📧</span>
                  {title}
                </Text>
              </Column>
              <Column align='right'>
                <Text style={headerInfo}>
                  {/* Clock icon */}
                  <span style={{ marginRight: "4px" }}>🕒</span>
                  {time}
                  {/* Calendar icon */}
                  <span style={{ marginLeft: "8px", marginRight: "4px" }}>
                    📅
                  </span>
                  {interval}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Content */}
          <Section style={content}>
            {/* Weather Section */}
            {weatherInfo && (
              <Section style={card}>
                <Heading as='h3' style={cardTitle}>
                  Weather Forecast
                </Heading>
                <Row>
                  <Column style={{ width: "40px" }}>
                    <Text style={iconContainer}>☁️</Text>
                  </Column>
                  <Column>
                    <Text style={cardSubtitle}>{weatherInfo.city}</Text>
                    <Text style={cardText}>{weatherInfo.temperature}</Text>
                  </Column>
                </Row>
              </Section>
            )}

            {/* Crypto Section */}
            {cryptoInfo && cryptoInfo.length > 0 && (
              <Section style={card}>
                <Heading as='h3' style={cardTitle}>
                  Cryptocurrency Prices
                </Heading>
                {cryptoInfo.map((crypto, index) => (
                  <Row
                    key={crypto.symbol}
                    style={index > 0 ? { marginTop: "12px" } : {}}
                  >
                    <Column style={{ width: "40px" }}>
                      <Text style={iconContainer}>💰</Text>
                    </Column>
                    <Column>
                      <Text style={cardSubtitle}>
                        {crypto.name} ({crypto.symbol})
                      </Text>
                      <Text style={cardText}>
                        Price: {crypto.price.toLocaleString()} €
                      </Text>
                    </Column>
                  </Row>
                ))}
              </Section>
            )}
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              You are receiving this newsletter because you subscribed to it.{" "}
              <Link href={unsubscribeUrl} style={footerLink}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#f3f4f6",
  borderRadius: "8px 8px 0 0",
  padding: "12px 24px",
  borderBottom: "1px solid #e5e7eb",
};

const headerTitle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#111827",
  margin: "0",
};

const headerInfo = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "0 0 8px 8px",
};

const card = {
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
};

const cardTitle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#111827",
  margin: "0 0 12px 0",
};

const cardSubtitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#111827",
  margin: "0",
};

const cardText = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "4px 0 0 0",
};

const iconContainer = {
  backgroundColor: "#f3f4f6",
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  margin: "0",
  textAlign: "center" as const,
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
};

const footer = {
  fontSize: "12px",
  color: "#6b7280",
  textAlign: "center" as const,
};

const footerLink = {
  color: "#2563eb",
  textDecoration: "none",
};

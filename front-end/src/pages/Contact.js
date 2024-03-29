import { createStyles, Image, Accordion, Grid, Col, Container, Title } from '@mantine/core';
import image from '../images/svg-14.svg';
import Sidebar from './Sidebar';
// import image from '../images/image1.svg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
  },
}));

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

function About() {
  const { classes } = useStyles();
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>

      <div className={classes.wrapper}>
        <h1 style={{ justifyContent: 'center' }}>FAQ</h1>
        <Container size="lg">
          <Grid id="faq-grid" gutter={50}>
            <Col span={12} md={6}>
              <Image src={image} alt="Frequently Asked Questions" sx={{ width: '200px' }} />
            </Col>
            <Col span={12} md={6}>
              <Title order={2} ta="left" className={classes.title}>
                Frequently Asked Questions
              </Title>

              <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
                <Accordion.Item className={classes.item} value="reset-password">
                  <Accordion.Control>How can I reset my password?</Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="another-account">
                  <Accordion.Control>Can I create more that one account?</Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="newsletter">
                  <Accordion.Control>How can I subscribe to monthly newsletter?</Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="credit-card">
                  <Accordion.Control>
                    How Can I store credit card information securely?
                  </Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="payment">
                  <Accordion.Control>What payment systems to you work with?</Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default About;

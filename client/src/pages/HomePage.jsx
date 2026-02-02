import {
  Box,
  Button,
  Grid,
  Link,
  styled,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SecurityIcon from "@mui/icons-material/Security";

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: "4.5rem",
  fontWeight: 800,
  letterSpacing: "2px",
  color: "#fff",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.8rem",
  },
}));

const CTAButton = styled(Button)({
  borderRadius: "30px",
  padding: "12px 36px",
  fontSize: "1.1rem",
  fontWeight: 600,
});

const FeatureItem = ({ icon, title, desc }) => (
  <Stack spacing={1} alignItems="center">
    {icon}
    <Typography variant="h6" color="white">
      {title}
    </Typography>
    <Typography variant="body2" color="rgba(255,255,255,0.7)" align="center">
      {desc}
    </Typography>
  </Stack>
);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4)), url('/invoice-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", px: 3 }}
      >
        <Grid item xs={12} md={10} lg={8}>
          <Stack spacing={4} alignItems="center">
            <HeroTitle align="center">
              InvoicePro
            </HeroTitle>

            <Typography
              variant="h5"
              align="center"
              sx={{ color: "rgba(255,255,255,0.75)", maxWidth: 700 }}
            >
              Create professional invoices, quotations & receipts in seconds.
              Built for freelancers, startups, and growing businesses.
            </Typography>

            {/* CTA Buttons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <CTAButton
                variant="contained"
                color="success"
                onClick={() => navigate("/register")}
              >
                Get Started Free
              </CTAButton>

              <CTAButton
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Login
              </CTAButton>
            </Stack>

            <Divider sx={{ width: "60%", bgcolor: "rgba(255,255,255,0.2)" }} />

            {/* Features */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <FeatureItem
                  icon={<ReceiptLongIcon sx={{ fontSize: 40, color: "#4caf50" }} />}
                  title="Smart Invoices"
                  desc="Auto-generated invoices with tax & totals."
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureItem
                  icon={<AutoGraphIcon sx={{ fontSize: 40, color: "#4caf50" }} />}
                  title="Business Ready"
                  desc="Perfect for freelancers & enterprises."
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureItem
                  icon={<SecurityIcon sx={{ fontSize: 40, color: "#4caf50" }} />}
                  title="Secure"
                  desc="Your data is encrypted & protected."
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;

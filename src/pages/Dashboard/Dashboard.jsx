import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Dashboard - Main landing page after login
 * Shows overview and quick access to key modules
 * @component
 */
export default function Dashboard() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Welcome to Flyway Warehouse Management
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Manage inventory, track stock movements, and monitor warehouse operations.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Quick Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Products
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, mt: 1 }}>
              View & Manage
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Warehouses
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, mt: 1 }}>
              Manage Locations
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Stock Vouchers
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, mt: 1 }}>
              Track Movements
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Reports
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, mt: 1 }}>
              View Analytics
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

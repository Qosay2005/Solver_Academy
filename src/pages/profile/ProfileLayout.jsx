import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { PersonOutlineOutlined, ReceiptLongOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useProfile, { normalizeProfileData } from '../../hocks/useProfile';
import useThemeStore from '../../hocks/useThemeStore';
import ProfileInfo from '../../components/profile/ProfileInfo';
import ProfileOrders from '../../components/profile/ProfileOrders';

function TabPanel({ children, value, index }) {
  if (value !== index) return null;

  return (
    <Box role="tabpanel" aria-labelledby={`profile-tab-${index}`} className="pt-6">
      {children}
    </Box>
  );
}

export default function ProfileLayout() {
  const { t } = useTranslation();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === 'dark';
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading, isError, error, refetch, isFetching } = useProfile();
  const profile = normalizeProfileData(data);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <CircularProgress sx={{ color: '#DB4444' }} />
      </div>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              {t('common.retry')}
            </Button>
          }
        >
          {error?.response?.data?.message || error?.message || t('profile.info.loadError')}
        </Alert>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-7 w-4 rounded-[3px] bg-gradient-to-b from-[#FF6B6B] to-[#DB4444]" />
          <Typography variant="subtitle2" className="font-bold uppercase tracking-[0.12em] text-[#DB4444]">
            {t('profile.title')}
          </Typography>
        </div>
        <Typography
          variant="h4"
          component="h1"
          className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${isDark ? 'text-slate-100' : 'text-zinc-900'}`}
        >
          {t('profile.title')}
        </Typography>
        <Typography variant="body2" className={`mt-1 ${isDark ? 'text-slate-400' : 'text-zinc-500'}`}>
          {t('profile.subtitle')}
        </Typography>
      </div>

      <Box
        className={`rounded-[24px] border shadow-sm ${isDark ? 'border-slate-700 bg-slate-800/60' : 'border-zinc-200/80 bg-white'}`}
      >
        <Tabs
          value={activeTab}
          onChange={(_, nextTab) => setActiveTab(nextTab)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label={t('profile.title')}
          sx={{
            px: { xs: 1, sm: 2 },
            borderBottom: 1,
            borderColor: isDark ? 'rgba(148,163,184,0.2)' : 'rgba(228,228,231,0.8)',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              minHeight: 56,
              color: isDark ? '#94a3b8' : '#71717a',
            },
            '& .Mui-selected': {
              color: isDark ? '#f8fafc' : '#091E27',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#DB4444',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          <Tab
            id="profile-tab-0"
            icon={<PersonOutlineOutlined fontSize="small" />}
            iconPosition="start"
            label={t('profile.tabs.info')}
          />
          <Tab
            id="profile-tab-1"
            icon={<ReceiptLongOutlined fontSize="small" />}
            iconPosition="start"
            label={t('profile.tabs.orders')}
          />
        </Tabs>

        <Box className="px-4 pb-6 sm:px-6">
          <TabPanel value={activeTab} index={0}>
            <ProfileInfo profile={profile} isRefreshing={isFetching} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <ProfileOrders orders={profile.orders} isRefreshing={isFetching} />
          </TabPanel>
        </Box>
      </Box>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { EditOutlined, EmailOutlined, Person, PhoneOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useUpdateProfile } from '../../hocks/useProfile';
import useThemeStore from '../../hocks/useThemeStore';

function ProfileField({ label, value, icon: Icon, isDark }) {
  return (
    <div
      className={`rounded-[16px] border p-4 ${
        isDark ? 'border-slate-700 bg-slate-900/40' : 'border-zinc-200 bg-zinc-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon sx={{ color: isDark ? '#64748b' : '#6b7280', fontSize: 22, mt: 0.25 }} />
        <div className="min-w-0 flex-1">
          <Typography variant="caption" className={`block font-semibold uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-zinc-500'}`}>
            {label}
          </Typography>
          <Typography variant="body1" className={`mt-1 break-words font-medium ${isDark ? 'text-slate-100' : 'text-zinc-900'}`}>
            {value || '—'}
          </Typography>
        </div>
      </div>
    </div>
  );
}

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  isDark: PropTypes.bool.isRequired,
};

export default function ProfileInfo({ profile, isRefreshing, onProfileUpdated }) {
  const { t } = useTranslation();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === 'dark';
  const { mutate: updateProfile, isPending, isSuccess, isError, error, reset } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
  });

  useEffect(() => {
    if (!isEditing) {
      setForm({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
      });
    }
  }, [profile.fullName, profile.email, profile.phone, isEditing]);

  const handleChange = (field) => (event) => {
    reset();
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleStartEdit = () => {
    reset();
    setForm({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset();
    setForm({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
    });
    setIsEditing(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    updateProfile(
      {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phone.trim(),
      },
      {
        onSuccess: async () => {
          await onProfileUpdated?.();
          setIsEditing(false);
        },
      },
    );
  };

  const textFieldSx = {
    '& .MuiInputLabel-root': {
      color: isDark ? '#94a3b8' : '#6b7280',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: isDark ? '#f8fafc' : '#091E27',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: isDark ? '#0f172a' : '#eef7fb',
      color: isDark ? '#f8fafc' : '#091E27',
      '& fieldset': {
        borderColor: isDark ? '#334155' : '#cbd9e1',
      },
      '&:hover fieldset': {
        borderColor: isDark ? '#475569' : '#9db4c5',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#091E27',
      },
    },
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography variant="h6" className={`font-bold ${isDark ? 'text-slate-100' : 'text-zinc-900'}`}>
          {t('profile.info.title')}
        </Typography>

        {!isEditing ? (
          <Button
            type="button"
            variant="outlined"
            startIcon={<EditOutlined fontSize="small" />}
            onClick={handleStartEdit}
            disabled={isRefreshing}
            sx={{
              borderRadius: 2,
              borderColor: isDark ? '#475569' : '#cbd9e1',
              color: isDark ? '#f8fafc' : '#091E27',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': {
                borderColor: '#091E27',
                backgroundColor: isDark ? 'rgba(15,23,42,0.5)' : 'rgba(9,30,39,0.04)',
              },
            }}
          >
            {t('profile.info.editProfile')}
          </Button>
        ) : null}
      </div>

      {isSuccess && !isEditing ? (
        <Alert severity="success" onClose={() => reset()}>
          {t('profile.info.changesSaved')}
        </Alert>
      ) : null}

      {isError ? (
        <Alert severity="error" onClose={() => reset()}>
          {error?.response?.data?.message
            || error?.response?.data?.errors?.[0]
            || error?.message
            || t('profile.info.saveFailed')}
        </Alert>
      ) : null}

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label={t('profile.info.fullName')}
              value={form.fullName}
              onChange={handleChange('fullName')}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: isDark ? '#64748b' : '#6b7280', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
            />
            <TextField
              label={t('profile.info.email')}
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ color: isDark ? '#64748b' : '#6b7280', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
            />
            <TextField
              label={t('profile.info.phone')}
              value={form.phone}
              onChange={handleChange('phone')}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlined sx={{ color: isDark ? '#64748b' : '#6b7280', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              variant="contained"
              disabled={isPending || isRefreshing}
              sx={{
                borderRadius: 2,
                backgroundColor: '#091E27',
                textTransform: 'none',
                fontWeight: 700,
                px: 3,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#0f2d3a' },
              }}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <CircularProgress size={16} sx={{ color: '#ffffff' }} />
                  {t('status.saving')}
                </span>
              ) : (
                t('profile.info.saveChanges')
              )}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              disabled={isPending}
              sx={{
                borderRadius: 2,
                borderColor: isDark ? '#475569' : '#cbd9e1',
                color: isDark ? '#f8fafc' : '#091E27',
                textTransform: 'none',
                fontWeight: 700,
                px: 3,
              }}
            >
              {t('profile.info.cancel')}
            </Button>
          </div>
        </form>
      ) : (
        <div className={`grid gap-4 md:grid-cols-2 ${isRefreshing ? 'opacity-80' : ''}`}>
          <ProfileField
            label={t('profile.info.fullName')}
            value={profile.fullName}
            icon={Person}
            isDark={isDark}
          />
          <ProfileField
            label={t('profile.info.email')}
            value={profile.email}
            icon={EmailOutlined}
            isDark={isDark}
          />
          <ProfileField
            label={t('profile.info.phone')}
            value={profile.phone}
            icon={PhoneOutlined}
            isDark={isDark}
          />
        </div>
      )}
    </div>
  );
}

ProfileInfo.propTypes = {
  profile: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  isRefreshing: PropTypes.bool,
  onProfileUpdated: PropTypes.func,
};

ProfileInfo.defaultProps = {
  isRefreshing: false,
  onProfileUpdated: undefined,
};

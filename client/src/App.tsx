import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import {
  GuestRoute,
  OnboardingRoute,
  ProtectedRoute,
} from '@/components/layout/ProtectedRoute'
import { AIEmployeeBuilderPage } from '@/pages/AIEmployeeBuilderPage'
import { AuthPage } from '@/pages/AuthPage'
import { BusinessSettingsPage } from '@/pages/BusinessSettingsPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { KnowledgeTrainingPage } from '@/pages/KnowledgeTrainingPage'
import { LandingPage } from '@/pages/LandingPage'
import { MarketplacePage } from '@/pages/MarketplacePage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { RoleSelectPage } from '@/pages/RoleSelectPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ResetPasswordPage } from '@/pages/ResetPasswordPage'
import { SkillsLibraryPage } from '@/pages/SkillsLibraryPage'
import { TermsPage } from '@/pages/TermsPage'
import { VerifyEmailPage } from '@/pages/VerifyEmailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelectPage />} />
      <Route path="/hotels" element={<MarketplacePage />} />
      <Route path="/owner" element={<LandingPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route element={<OnboardingRoute />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employee" element={<AIEmployeeBuilderPage />} />
          <Route path="/knowledge" element={<KnowledgeTrainingPage />} />
          <Route path="/skills" element={<SkillsLibraryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<BusinessSettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

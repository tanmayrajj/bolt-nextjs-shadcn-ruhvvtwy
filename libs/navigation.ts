import { NavigationItem } from '@/types/navigation'
import { UserRole } from '@/types/user'
import { GiftIcon, Award, Mail, Lock, UserX, KeyRound } from 'lucide-react'

export const navigationItems: NavigationItem[] = [
  {
    title: "Gift Card",
    url: "/gift-card",
    icon: GiftIcon,
    allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DEVELOPER],
  },
  {
    title: "Courtesy Points",
    url: "/courtesy-points",
    icon: Award,
    allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    title: "Resend Activation",
    url: "/resend-activation-email",
    icon: Mail,
    allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    title: "Manual Reset Password",
    url: "/reset-password-admin",
    icon: Lock,
    allowedRoles: [UserRole.ADMIN],
  },
  {
    title: "Account Deletion",
    url: "/account-deletion",
    icon: UserX,
    allowedRoles: [UserRole.ADMIN],
  },
  {
    title: "Reset Password Email",
    url: "/reset-password-email",
    icon: KeyRound,
    allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],
  },
]



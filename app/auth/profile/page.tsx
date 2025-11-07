'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Mail, Lock, Edit2, Save, X, Eye, EyeOff, Check } from 'lucide-react';

// Validation Schemas
const profileSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Too short'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bio: yup.string().max(160, 'Bio too long').optional(),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().required('Current password required'),
  newPassword: yup.string()
    .required('New password required')
    .min(8, 'Min 8 characters')
    .matches(/[a-z]/, 'Must contain lowercase')
    .matches(/[A-Z]/, 'Must contain uppercase')
    .matches(/[0-9]/, 'Must contain number'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password'),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;
type PasswordFormData = yup.InferType<typeof passwordSchema>;

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [user, setUser] = useState({
    name: 'Alex Morgan',
    email: 'alex@example.com',
    bio: 'Full-stack developer | React & Node.js enthusiast',
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: isCreating ? {} : user,
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    // setUser(data);
    console.log('Profil echanged:', data);
    setIsEditing(false);
    setIsCreating(false);
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log('Password changed:', data);
    alert('Password updated successfully!');
    resetPassword();
  };

  const toggleEdit = () => {
    setIsEditing(true);
    setIsCreating(false);
    reset(user);
  };

  const toggleCreate = () => {
    setIsCreating(true);
    setIsEditing(false);
    reset();
  };

  const cancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    reset(user);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white py-6 px-2 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 ">
          <div className="bg-white dark:bg-black dark:text-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {isCreating ? 'New Profile' : user.name}
                    </h1>
                    <p className="text-sm text-gray-500">@{user.email.split('@')[0]}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isCreating ? (
                    <button
                      onClick={cancel}
                      className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  ) : (
                    <>
                      {!isEditing && (
                        <div >
                          <button
                            onClick={toggleEdit}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                    
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    {...registerProfile('name')}
                    disabled={!isEditing && !isCreating}
                    className={`w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                      profileErrors.name
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
                    } ${!isEditing && !isCreating ? 'bg-gray-50' : 'bg-white'}`}
                    placeholder="John Doe"
                  />
                  {profileErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    {...registerProfile('email')}
                    type="email"
                    disabled={!isEditing && !isCreating}
                    className={`w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                      profileErrors.email
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
                    } ${!isEditing && !isCreating ? 'bg-gray-50' : 'bg-white'}`}
                    placeholder="you@example.com"
                  />
                  {profileErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  {...registerProfile('bio')}
                  disabled={!isEditing && !isCreating}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors resize-none ${
                    profileErrors.bio
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300'
                  } ${!isEditing && !isCreating ? 'bg-gray-50' : 'bg-white'}`}
                  placeholder="Tell us about yourself..."
                />
                {profileErrors.bio && (
                  <p className="mt-1 text-sm text-red-600">{profileErrors.bio.message}</p>
                )}
              </div>

              {(isEditing || isCreating) && (
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={cancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {isCreating ? 'Create Profile' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Password Change Section */}
          <div className="bg-white dark:bg-black dark:text-white rounded-lg border border-gray- reproduced200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-5">
              {[
                { key: 'currentPassword', label: 'Current Password' },
                { key: 'newPassword', label: 'New Password' },
                { key: 'confirmPassword', label: 'Confirm New Password' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      {...registerPassword(key as keyof PasswordFormData)}
                      type={showPassword[key as keyof typeof showPassword] ? 'text' : 'password'}
                      className={`w-full px-3 py-2 pr-10 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                        passwordErrors[key as keyof typeof passwordErrors]
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          [key]: !prev[key as keyof typeof showPassword],
                        }))
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword[key as keyof typeof showPassword] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {passwordErrors[key as keyof typeof passwordErrors] && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors[key as keyof typeof passwordErrors]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
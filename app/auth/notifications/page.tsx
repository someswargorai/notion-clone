'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus, AtSign, Camera, MoreHorizontal, Moon, Sun, Bell } from 'lucide-react';
import Image from 'next/image';

interface Notification {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'mention';
  user: {
    name: string;
    username: string;
    avatar: string | null;
  };
  post?: string;
  time: string;
  read: boolean;
  following?: boolean;
}

export default function InstagramNotifications() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'follow',
      user: { name: 'Sarah Chen', username: 'sarahchen', avatar: null },
      time: '2m',
      read: false,
      following: false,
    },
    {
      id: '2',
      type: 'like',
      user: { name: 'Mike Johnson', username: 'mikej', avatar: null },
      post: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop',
      time: '15m',
      read: false,
    },
    {
      id: '3',
      type: 'comment',
      user: { name: 'Emma Wilson', username: 'emmwilson', avatar: null },
      post: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
      time: '1h',
      read: true,
    },
    {
      id: '4',
      type: 'mention',
      user: { name: 'Alex Kim', username: 'alexkim', avatar: null },
      time: '3h',
      read: true,
    },
    {
      id: '5',
      type: 'like',
      user: { name: 'Jordan Lee', username: 'jordanlee', avatar: null },
      post: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
      time: '1d',
      read: true,
    },
    {
      id: '6',
      type: 'follow',
      user: { name: 'Taylor Swift', username: 'taylorswift', avatar: null },
      time: '2d',
      read: true,
      following: true,
    },
     {
      id: '6',
      type: 'follow',
      user: { name: 'Taylor Swift', username: 'taylorswift', avatar: null },
      time: '2d',
      read: true,
      following: true,
    },
     {
      id: '6',
      type: 'follow',
      user: { name: 'Taylor Swift', username: 'taylorswift', avatar: null },
      time: '2d',
      read: true,
      following: true,
    },
     {
      id: '6',
      type: 'follow',
      user: { name: 'Taylor Swift', username: 'taylorswift', avatar: null },
      time: '2d',
      read: true,
      following: true,
    },
     {
      id: '6',
      type: 'follow',
      user: { name: 'Taylor Swift', username: 'taylorswift', avatar: null },
      time: '2d',
      read: true,
      following: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const toggleFollow = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, following: !n.following } : n)
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'follow': return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'like': return <Heart className="w-5 h-5 text-red-500 fill-red-500" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-gray-600" />;
      case 'mention': return <AtSign className="w-5 h-5 text-orange-500" />;
      default: return null;
    }
  };

  const groupNotifications = () => {
    const now = 1735689600000;
    const groups: { [key: string]: Notification[] } = {
      'Today': [],
      'This Week': [],
      'This Month': [],
    };

    notifications.forEach(n => {
      const minutesAgo = Math.floor((now - new Date(n.time).getTime()) / 60000);
      if (minutesAgo < 1440) groups['Today'].push(n);
      else if (minutesAgo < 10080) groups['This Week'].push(n);
      else groups['This Month'].push(n);
    });

    return groups;
  };

  const grouped = groupNotifications();

  return (
    <>
      <div className={`min-h-screen dark:bg-black dark:text-white bg-white text-black transition-colors`}>
        <div className="max-w-6xl mx-auto">

          {/* Notifications List */}
          <div className="pb-20">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg mb-1">No Notifications Yet</h3>
                <p className="text-sm text-gray-500">When you get notifications, they&apos;ll show up here.</p>
              </div>
            ) : (
              <div className="space-y-6 p-4">
                {Object.entries(grouped).map(([period, items]) => (
                  items.length > 0 && (
                    <div key={period}>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3  top-16 bg-white dark:bg-black -mx-4 px-4 py-1">
                        {period}
                      </h3>
                      <div className="space-y-3">
                        {items.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markAsRead(n.id)}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                              !n.read
                                ? 'bg-blue-50 dark:bg-blue-900/20'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                            }`}
                          >
                            {/* Avatar */}
                            <div className="relative shrink-0">
                              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-yellow-400 to-pink-600 p-0.5">
                                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                  {n.user.avatar ? (
                                    <Image src={n.user.avatar} alt={n.user.name} width={48} height={48} className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="text-lg font-bold text-gray-600">
                                      {n.user.name.charAt(0)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="absolute -bottom-1 -right-1">
                                {getIcon(n.type)}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">
                                <span className="font-semibold">{n.user.name}</span>{' '}
                                {n.type === 'follow' && (n.following ? 'started following you' : 'requested to follow you')}
                                {n.type === 'like' && 'liked your photo'}
                                {n.type === 'comment' && 'commented: '}
                                {n.type === 'mention' && 'mentioned you in a comment'}
                                {n.type === 'comment' && <span className="text-gray-500">fire fire fire</span>}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                            </div>

                            {/* Post or Action */}
                            <div className="flex items-center gap-2">
                              {n.post && (
                                <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                  <Image src={n.post} alt="Post" width={48} height={48} className="w-full h-full object-cover" />
                                </div>
                              )}
                              {n.type === 'follow' && !n.following && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFollow(n.id);
                                  }}
                                  className="px-4 py-1.5 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                  Follow
                                </button>
                              )}
                              {n.type === 'follow' && n.following && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFollow(n.id);
                                  }}
                                  className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                  Following
                                </button>
                              )}
                              <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
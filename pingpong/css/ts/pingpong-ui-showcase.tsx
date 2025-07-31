import React, { useState } from 'react';
import { 
  User, Trophy, Target, Calendar, Users, Edit3, UserPlus, 
  Search, Bell, Settings, LogOut, Upload, X, Check,
  Github, Mail, Eye, EyeOff, ChevronDown, Star,
  Filter, SortAsc, MoreHorizontal, MessageCircle,
  Zap, Award, TrendingUp, Home, Gamepad2, BarChart3,
  Crown, Play, Shield
} from 'lucide-react';

const PingPongUIShowcase = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showPassword, setShowPassword] = useState(false);

  // Mock data
  const mockUser = {
    id: '1',
    name: 'username1',
    email: 'user@email.com',
    avatar: null,
    isOnline: true,
    location: 'MAR',
    rank: 15,
    stats: {
      totalGames: 156,
      wins: 85,
      losses: 25,
      winRate: 77,
      streak: 5
    },
    joinDate: '2024-01-15'
  };

  const mockMatches = [
    { id: 1, opponent: 'username13', opponentAvatar: null, score: '7:3', result: 'win', isRecent: true },
    { id: 2, opponent: 'username13', opponentAvatar: null, score: '2:8', result: 'loss', isRecent: true },
    { id: 3, opponent: 'username13', opponentAvatar: null, score: '3:1', result: 'win', isRecent: true },
    { id: 4, opponent: 'username13', opponentAvatar: null, score: '9:8', result: 'win', isRecent: true },
  ];

  const mockFriends = [
    { id: 1, name: 'username3', avatar: null, isOnline: true, status: 'Playing' },
    { id: 2, name: 'username5', avatar: null, isOnline: false, status: 'Offline' },
    { id: 3, name: 'username4', avatar: null, isOnline: true, status: 'Available' },
    { id: 4, name: 'username7', avatar: null, isOnline: false, status: 'Away' },
  ];

  const getInitials = (name) => {
    return name.split('').slice(0, 2).join('').toUpperCase();
  };

  // Sidebar Component
  const Sidebar = () => (
    <div className="w-16 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-8">
        <Target className="text-white" size={20} />
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={() => setCurrentView('dashboard')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentView === 'dashboard' 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700'
          }`}
        >
          <Home size={20} />
        </button>
        <button 
          onClick={() => setCurrentView('profile')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentView === 'profile' 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700'
          }`}
        >
          <User size={20} />
        </button>
        <button 
          onClick={() => setCurrentView('friends')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentView === 'friends' 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700'
          }`}
        >
          <Users size={20} />
        </button>
        <button 
          onClick={() => setCurrentView('signin')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentView === 'signin' 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700'
          }`}
        >
          <LogOut size={20} />
        </button>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
          <Settings size={20} />
        </button>
      </div>

      {/* Bottom Power Button */}
      <div className="mt-auto">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-all">
          <Shield size={20} />
        </button>
      </div>
    </div>
  );

  // Dashboard View
  const DashboardView = () => (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">👤</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Welcome to Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
                🇲🇦 MAR
              </div>
              <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                <Star size={20} />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <Bell size={20} />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Hero Section with Cosmic Background */}
          <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 rounded-3xl p-8 mb-8 overflow-hidden">
            {/* Cosmic Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Floating Planets/Orbs */}
            <div className="absolute top-8 right-16 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60"></div>
            <div className="absolute bottom-12 right-32 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-40"></div>
            <div className="absolute top-16 left-1/4 w-4 h-4 bg-white rounded-full opacity-60"></div>
            <div className="absolute bottom-8 left-1/3 w-2 h-2 bg-cyan-300 rounded-full opacity-80"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              {/* User Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center border-4 border-cyan-300/50">
                  <span className="text-4xl">👤</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-slate-900"></div>
              </div>

              {/* User Stats */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl font-bold text-white mb-2">{mockUser.name}</h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{mockUser.stats.totalGames}</div>
                    <div className="text-slate-300 text-sm">Total Game</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{mockUser.stats.wins}</div>
                    <div className="text-slate-300 text-sm">Win</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">{mockUser.stats.losses}</div>
                    <div className="text-slate-300 text-sm">Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg text-slate-300 mb-2">Location</div>
                    <div className="text-xl font-bold text-red-400">🇲🇦 {mockUser.location}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg text-slate-300 mb-2">Rank</div>
                    <div className="text-3xl font-bold text-yellow-400">{mockUser.rank}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Game History */}
            <div className="lg:col-span-1 bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Game History</h3>
              </div>
              
              <div className="space-y-4">
                {mockMatches.map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{getInitials(match.opponent)}</span>
                      </div>
                      <span className="text-slate-300 font-medium">{match.opponent}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        match.result === 'win' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-300'
                      }`}>
                        {match.score}
                      </div>
                      <span className="text-slate-400 text-xs font-medium">{match.opponent}</span>
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">👤</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Friends */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Friends</h3>
              </div>
              
              <div className="space-y-4">
                {mockFriends.slice(0, 4).map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{getInitials(friend.name)}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${
                          friend.isOnline ? 'bg-green-400' : 'bg-slate-500'
                        }`}></div>
                      </div>
                      <span className="text-slate-300 font-medium">{friend.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      friend.isOnline ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/50 text-slate-400'
                    }`}>
                      {friend.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <BarChart3 size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Statistics</h3>
              </div>
              
              {/* Performance Chart Area */}
              <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl p-4 mb-6 h-32 flex items-end justify-center">
                <div className="text-slate-400 text-sm">Performance Chart</div>
              </div>
              
              {/* Circular Progress */}
              <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"></div>
                  <div className="absolute inset-2 bg-slate-800 rounded-full flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-white">{mockUser.stats.totalGames}</div>
                    <div className="text-xs text-slate-400">Game</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-400 text-sm">Wins</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                  <span className="text-slate-400 text-sm">Losses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Sign In View with Dark Theme
  const SignInView = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-slate-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">PingPong Pro</h1>
          <p className="text-slate-400">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white font-medium py-4 px-4 rounded-xl transition-all hover:shadow-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-medium py-4 px-4 rounded-xl transition-all">
            <Github size={20} />
            Continue with GitHub
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );

  // Profile View with Dark Theme
  const ProfileView = () => (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 rounded-3xl p-8 mb-6 overflow-hidden border border-slate-700">
            {/* Cosmic Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Avatar Section */}
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-cyan-300/30">
                  {getInitials(mockUser.name)}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-slate-900 shadow-lg"></div>
                <button className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="text-white" size={24} />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{mockUser.name}</h1>
                    <div className="flex items-center gap-4 text-slate-300">
                      <span className="flex items-center gap-2">
                        <Crown className="text-yellow-400" size={16} />
                        Rank #{mockUser.rank}
                      </span>
                      <span>•</span>
                      <span>🇲🇦 {mockUser.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 sm:ml-auto">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all">
                      <Edit3 size={16} />
                      Edit Profile
                    </button>
                    <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 px-6 py-3 rounded-xl font-medium transition-all">
                      <UserPlus size={16} />
                      Add Friend
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <Trophy size={18} />
                      <span className="text-sm font-medium">Wins</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{mockUser.stats.wins}</div>
                  </div>
                  
                  <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                      <Target size={18} />
                      <span className="text-sm font-medium">Losses</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{mockUser.stats.losses}</div>
                  </div>
                  
                  <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <TrendingUp size={18} />
                      <span className="text-sm font-medium">Win Rate</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{mockUser.stats.winRate}%</div>
                  </div>
                  
                  <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-purple-400 mb-2">
                      <Zap size={18} />
                      <span className="text-sm font-medium">Streak</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{mockUser.stats.streak}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700">
            <div className="border-b border-slate-700">
              <nav className="flex">
                <button className="px-8 py-4 text-sm font-medium border-b-2 border-purple-500 text-purple-400">
                  Match History
                </button>
                <button className="px-8 py-4 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-slate-300">
                  Friends
                </button>
                <button className="px-8 py-4 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-slate-300">
                  Achievements
                </button>
              </nav>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Matches</h2>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-700 transition-all">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {mockMatches.map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all border border-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getInitials(match.opponent)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{match.opponent}</div>
                        <div className="text-sm text-slate-400">2 hours ago • 24m</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-300">{match.score}</div>
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        match.result === 'win'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      }`}>
                        {match.result === 'win' ? 'Won' : 'Lost'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Friends View with Dark Theme
  const FriendsView = () => (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-800 rounded-2xl border border-slate-700">
            <div className="border-b border-slate-700 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Friends</h1>
                  <p className="text-slate-400">{mockFriends.length} friends • {mockFriends.filter(f => f.isOnline).length} online</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search friends..."
                      className="pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all">
                    Add Friend
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFriends.map((friend) => (
                  <div key={friend.id} className="bg-slate-700/50 hover:bg-slate-700 rounded-xl p-6 transition-all border border-slate-600 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {getInitials(friend.name)}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                            friend.isOnline ? 'bg-green-400' : 'bg-slate-500'
                          }`}></div>
                        </div>
                        <div>
                          <div className="font-medium text-white">{friend.name}</div>
                          <div className={`text-sm ${
                            friend.isOnline ? 'text-green-400' : 'text-slate-500'
                          }`}>
                            {friend.status}
                          </div>
                        </div>
                      </div>
                      
                      <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-white transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm py-2 px-3 rounded-lg transition-all">
                        Challenge
                      </button>
                      <button className="p-2 bg-slate-600 hover:bg-slate-500 text-slate-300 rounded-lg transition-all">
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const views = {
    dashboard: { component: DashboardView, name: 'Dashboard' },
    signin: { component: SignInView, name: 'Sign In Page' },
    profile: { component: ProfileView, name: 'Profile Page' },
    friends: { component: FriendsView, name: 'Friends Management' }
  };

  const CurrentComponent = views[currentView].component;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-4">🏓 Ping Pong Platform - Dark Gaming UI</h1>
          <div className="flex flex-wrap gap-2">
            {Object.entries(views).map(([key, view]) => (
              <button
                key={key}
                onClick={() => setCurrentView(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                {view.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current View */}
      <CurrentComponent />
    </div>
  );
};

export default PingPongUIShowcase;
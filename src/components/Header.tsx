"use client";
import Link from "next/link";
import { useFirebase } from "@/services/database/FirebaseContext";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  UserIcon,
  CalendarIcon,
  PlusIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const { user, logout } = useFirebase();

  return (
    <header className="flex justify-between items-center gap-4 w-full h-20 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 shadow-lg px-6">
      {/* Logo/Title */}
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-8 h-8 text-white" />
        <h1 className="text-2xl font-bold text-white">TodoNext</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-white hover:text-purple-200 transition-all duration-300 font-medium hover:scale-105"
        >
          <HomeIcon className="w-5 h-5" />
          Home
        </Link>
        <Link
          href="/events"
          className="flex items-center gap-2 text-white hover:text-purple-200 transition-all duration-300 font-medium hover:scale-105"
        >
          <CalendarIcon className="w-5 h-5" />
          Events
        </Link>
        <Link
          href="/events/new"
          className="flex items-center gap-2 text-white hover:text-purple-200 transition-all duration-300 font-medium hover:scale-105"
        >
          <PlusIcon className="w-5 h-5" />
          Add Event
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                src={user.photoURL || undefined}
                name={user.displayName || user.email || "User"}
                size="md"
                className="cursor-pointer border-2 border-white hover:border-purple-200 transition-all duration-300 hover:scale-105"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold text-purple-600">Signed in as</p>
                <p className="font-semibold text-purple-600">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="profile_page" as={Link} href="/profile">
                <UserIcon className="w-4 h-4 text-purple-600" />
                <p className="font-semibold text-purple-600">Profile</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                className="text-purple-600"
                onPress={logout}
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:scale-105"
          >
            <UserIcon className="w-5 h-5" />
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

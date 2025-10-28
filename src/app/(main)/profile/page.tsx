"use client";
import { useFirebase } from "@/services/database/FirebaseContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Avatar,
} from "@heroui/react";
import {
  CalendarIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useFirebase();
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  if (!user) {
    return (
      <div className="w-full p-8 flex justify-center items-center">
        <Card className="max-w-md">
          <CardBody className="text-center">
            <p className="text-lg text-purple-600">
              Please log in to view your profile
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full p-8 flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <div className="max-w-2xl w-full">
        <Card className="shadow-xl border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center gap-4">
              <Avatar
                src={user.photoURL || undefined}
                name={user.displayName || user.email || "User"}
                size="lg"
                className="border-2 border-white"
              />
              <div>
                <h1 className="text-2xl font-bold">
                  {user.displayName || "User Profile"}
                </h1>
                <p className="text-purple-100">Welcome back!</p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Display Name</p>
                    <p className="font-semibold text-purple-800">
                      {user.displayName || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-semibold text-purple-800">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email Status</p>
                    <Chip
                      color={user.emailVerified ? "success" : "warning"}
                      variant="flat"
                      size="sm"
                    >
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </Chip>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-semibold text-purple-800">
                      {formatDate(user.metadata?.creationTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-purple-200 pt-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">User ID</p>
                  <p className="font-mono text-xs text-purple-700 break-all">
                    {user.uid}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Last Sign In</p>
                  <p className="text-purple-800">
                    {formatDate(user.metadata?.lastSignInTime)}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>

          <CardFooter className="bg-purple-50 border-t border-purple-200 p-6">
            <div className="flex justify-between items-center w-full">
              <div className="text-sm text-purple-600">
                Manage your account settings
              </div>
              <Button
                color="danger"
                variant="bordered"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onPress={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

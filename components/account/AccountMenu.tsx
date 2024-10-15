"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RandomPixelAvatar from "@/components/account/RandomPixelAvatar";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

function AccountMenu() {
  const { login, logout, loggedIn, userInfo, userAccounts, loadingAuth } =
    useAuth();

  return (
    <div className="m-3">
      {!loadingAuth && loggedIn && (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                {userInfo?.profileImage && (
                  <Image
                    src={userInfo?.profileImage}
                    alt={"user image"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                {!userInfo?.profileImage && (
                  <div className="rounded-full overflow-hidden">
                    <RandomPixelAvatar
                      username={userAccounts || "username"}
                      size={32}
                    />
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>
                {userInfo?.name && <p>{userInfo.name}</p>}
                {!userInfo?.name && userAccounts && <p>{userAccounts}</p>}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Profile Button */}
              <DropdownMenuItem>Profile</DropdownMenuItem>

              <DropdownMenuSeparator />
              {/* Logout Button */}
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {!loadingAuth && !loggedIn && (
        <Button onClick={login} className="px-8 rounded-lg">
          Sign in
        </Button>
      )}
      {loadingAuth && (
        <div className="flex justify-center">
          <Loader2Icon className="w-6 h-6 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default AccountMenu;

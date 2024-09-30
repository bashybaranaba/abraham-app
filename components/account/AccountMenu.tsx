"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import RandomPixelAvatar from "@/components/account/RandomPixelAvatar";
import { Button } from "@/components/ui/button";

function AccountMenu() {
  const { login, logout, loggedIn, userInfo, userAccounts } = useAuth();

  return (
    <div className="m-3">
      {loggedIn && (
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
      {!loggedIn && (
        <Button onClick={login} className="px-8 rounded-lg">
          Sign in
        </Button>
      )}
    </div>
  );
}

export default AccountMenu;

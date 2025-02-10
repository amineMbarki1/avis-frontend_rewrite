import { useAuth } from "@/context/AuthProvider";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";

export default function AccountMenu() {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
            }}
            className="transition-transform"
            name={
              user.role.includes("admin")
                ? user.username
                : `${user.firstName} ${user.lastName}`
            }
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">
              @{user.role.includes("admin") ? user.username : user.email}
            </p>
          </DropdownItem>

          <DropdownItem onPress={logout} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
